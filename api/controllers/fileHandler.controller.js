const fs = require('fs')
const path = require('path')
const dir = path.join(path.resolve(path.dirname('')), 'api')
const excel = require('./excel.controller')
const bucketHandler = require('./bucket.controller')

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

const readExcel = (file) => {
  return new Promise((resolve, reject) => {
    excel.excelToList(`${dir}/upload/${file}`).then((data) => {
      fs.unlinkSync(`${dir}/upload/${file}`)
      resolve(data)
    }).catch((err) => {
      fs.unlinkSync(`${dir}/upload/${file}`)
      reject(err)
    })
  })
}

const uploadFile = (filePath, userID) => {
  return new Promise((resolve, reject) => {
    bucketHandler.uploadFile(filePath, userID).then(resolve).catch(reject)
  })
}

const unlinkFile = (file) => {
  fs.unlink(`${dir}/upload/${file}`, (_, __) => console.info)
}

module.exports = { readTemplate, readExcel, uploadFile, unlinkFile }
