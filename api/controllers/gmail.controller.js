// Google APIs go here
const fs = require('fs')
const { google } = require('googleapis')
const { createMimeMessage } = require('mimetext')
const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'gif', 'ico', 'bmp']
const PDF_EXT = ['pdf']
const OTHER_TYPES = {
  csv: 'text/csv',
  csv1: 'application/csv',
  json: 'application/json',
  txt: 'text/plain',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xlsb: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  xls: 'application/vnd.ms-excel',
  xlsm: 'application/vnd.ms-excel.sheet.macroEnabled.12',
  doc: 'application/msword',
  docm: 'application/vnd.ms-word.document.macroEnabled.12',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  dotx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  dotm: 'application/vnd.ms-word.template.macroEnabled.12',
  html: 'text/html',
  pdf: 'application/pdf',
  potm: 'application/vnd.ms-powerpoint.template.macroEnabled.12',
  potx: 'application/vnd.openxmlformats-officedocument.presentationml.template',
  ppam: 'application/vnd.ms-powerpoint.addin.macroEnabled.12',
  pps: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  ppsx: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  ppsm: 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
  ppt: 'application/vnd.ms-powerpoint',
  pptm: 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  rtf: 'application/rtf',
  rtf2: 'text/rtf'
}

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.metadata'
]

const AUTH_CLIENT = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URL
)

const getCredLink = () => {
  return new Promise((resolve, reject) => {
    const url = AUTH_CLIENT.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    resolve(url)
  })
}

const getToken = (code) => {
  return new Promise((resolve, reject) => {
    AUTH_CLIENT.getToken(code, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

const loadUser = (token) => {
  return new Promise((resolve, reject) => {
    AUTH_CLIENT.setCredentials(JSON.parse(token))
    const gmail = google.gmail({ version: 'v1' })
    gmail.users
      .getProfile({ userId: 'me', auth: AUTH_CLIENT })
      .then((response) => {
        resolve(response)
      })
      .catch(reject)
  })
}

const sendSingleMessage = (
  token,
  HTML = null,
  recipient,
  from,
  subject,
  plainText,
  userId = 'me',
  attachments = null
) => {
  return new Promise((resolve, reject) => {
    const msg = createMail(
      HTML,
      from,
      subject,
      plainText,
      attachments,
      reject)
    msg.setTo(`<${recipient}>`)

    // console.log(msg.asRaw())

    const buffer = Buffer.from(msg.asRaw())
    const base64SafeString = buffer.toString('base64')
    AUTH_CLIENT.setCredentials(JSON.parse(token))
    const gmail = google.gmail({ version: 'v1', auth: AUTH_CLIENT })
    gmail.users.messages
      .send({
        userId,
        requestBody: {
          raw: base64SafeString
        }
      })
      .then(resolve)
      .catch(reject)
  })
}

const sendMultipleMails = (
  token,
  HTML = null,
  recipients = [],
  from,
  subject,
  plainText,
  userId = 'me',
  attachments = null
) => {
  return new Promise((resolve, reject) => {
    const msg = createMail(
      HTML,
      from,
      subject,
      plainText,
      attachments,
      reject)
    msg.setTo(`<${recipients[0]}>`)
    msg.setBcc(recipients.slice(1))

    const buffer = Buffer.from(msg.asRaw())
    const base64SafeString = buffer.toString('base64')
    AUTH_CLIENT.setCredentials(JSON.parse(token))
    const gmail = google.gmail({ version: 'v1', auth: AUTH_CLIENT })
    gmail.users.messages
      .send({
        userId,
        requestBody: {
          raw: base64SafeString
        }
      })
      .then(resolve)
      .catch(reject)
  })
}

module.exports = { getCredLink, getToken, sendSingleMessage, loadUser, sendMultipleMails }

// Non exported functions

const createMail = (
  HTML = null,
  from,
  subject,
  plainText,
  attachments = null,
  reject
) => {
  const msg = createMimeMessage()
  msg.setSender(`<${from}>`)
  // msg.setBcc(['fgh@jkl.com', 'test2@test.com', { name: 'Name', addr: 'test3@test.com' }])
  msg.setSubject(subject)
  // add html version
  if (HTML) { msg.setMessage('text/html', HTML) }
  // add alternative plain text version
  msg.setMessage('text/plain', plainText)
  if (attachments) {
    if (attachments.length) {
      attachments.forEach((attachment) => {
        const name = attachment.name
        const extension = attachment.name.split('.').pop()
        let mimeType = ''
        if (IMAGE_EXT.includes(extension)) {
          mimeType = 'image/' + extension
        } else if (PDF_EXT.includes(extension)) {
          mimeType = 'application/pdf'
        } else if (OTHER_TYPES.keys().includes(extension)) {
          mimeType = OTHER_TYPES[extension]
        } else {
          reject(Error('file format not supported'))
        }
        const file = fs.readFileSync(attachment.path, { encoding: 'base64' })
        msg.addAttachment(name, mimeType, file)
      })
    }
  }
  return msg
}
