// Google APIs go here
const { google } = require('googleapis')
const Mime = require('mime-message')

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

const sendSingleMessage = (token, message, recipient, from, userId = 'me') => {
  return new Promise((resolve, reject) => {
    const messageData = {
      type: 'multipart/mixed',
      encoding: 'UTF-8',
      from,
      to: [recipient],
      cc: [],
      bcc: [],
      date: new Date(),
      subject: 'Test',
      body: message
    }
    const email = Mime.createMimeMessage(messageData)
    const base64SafeString = email.toBase64SafeString()
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
  })
}

module.exports = { getCredLink, getToken, sendSingleMessage, loadUser }
