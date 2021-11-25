const readXlsxFile = require('read-excel-file/node')

const excelToList = (path) => {
  const VALID_COLUMNS = ['email',
    'email address',
    'contact email',
    'personal email',
    'contact_email',
    'personal_email',
    'email_address',
    'mail',
    'mail id',
    'mail_address',
    'mail address',
    'mailing address',
    'mailing_address'
  ]
  return new Promise((resolve, reject) => {
    console.log(path)
    readXlsxFile(path).then((rows) => {
      rows[0].forEach((row, index) => {
        if (row != null) {
          if (VALID_COLUMNS.includes(row.toLowerCase())) {
            resolve(rows.map(row => row[index]))
          }
        }
      })
      reject(Error(`Invalid columns:\n one of the following should be available: ${VALID_COLUMNS.join(',')}`))
    })
  })
}

module.exports = { excelToList }
