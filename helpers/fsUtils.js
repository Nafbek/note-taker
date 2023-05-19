
const fs = require('fs')
const util = require('util')


const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile)



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