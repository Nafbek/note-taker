//Imports modules
const fs = require('fs')
const util = require('util')

//Converts the asychronous functions into promises
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile)

//Append the content to the file
function appendToFile(filePath, content) {
    return new Promise((resolve, reject) => {
      readFromFile(filePath, 'utf8')
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