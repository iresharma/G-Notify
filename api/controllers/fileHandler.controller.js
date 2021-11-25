const fs = require('fs')
const path = require('path')
const dir = path.join(path.resolve(path.dirname('')), 'api')
const excel = require('./excel.controller')

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

module.exports = { readTemplate, readExcel }
