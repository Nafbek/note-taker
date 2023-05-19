const { json } = require('express');
const fs = require('fs')
const util = require('util')


// const path = require('path')
// const filePath = path.join(__dirname, '../', 'db', 'db.json')

const readFromFile = util.promisify(fs.readFile);
const writeToFileAsync = util.promisify(fs.writeFile)

function writeToFile(filePath, data){
    return writeToFileAsync(filePath, JSON.stringify(data))

}
// const filePath = '../db/db.json'

// function appendToFile (filePath, newNote) {
//     readFromFile(filePath)
//     .then((data)=> {
//         const parsedData = JSON.parse(data)
//         parsedData.push(newNote)
//         writeToFile(filePath, parsedData)
//     })
//     .catch((err)=> console.log(err))
// }
function appendToFile(filePath, content) {
    return new Promise((resolve, reject) => {
      readFromFile(filePath)
        .then((data) => {
          const parsedData = JSON.parse(data);
          parsedData.push(content);
          return writeToFile(filePath, JSON.stringify(parsedData));
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  

module.exports = {readFromFile, writeToFile, appendToFile};