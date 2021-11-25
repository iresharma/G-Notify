const fs = require('fs')
const path = require('path')
const dir = path.join(path.resolve(path.dirname('')), 'api')

const readTemplate = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${dir}/upload/${file}`, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      fs.unlinkSync(`${dir}/upload/${file}`)
      resolve(data)
    })
  })
}

module.exports = { readTemplate }
