const fs = require('fs')

const readTemplate = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

module.exports = { readTemplate }
