// Google APIs go here
const { google } = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile']

const getCredLink = () => {
  return new Promise((resolve, reject) => {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URL
    )

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    resolve(url)
  })
}

const getToken = (code) => {
  return new Promise((resolve, reject) => {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URL
    )

    oauth2Client.getToken(code, (err, token) => {
      if (err) { reject(err) }
      resolve(token)
    })
  })
}

const sendMessage = (token, message) => {
  const authClient = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URL
  ).setCredentials(JSON.parse(token))
  const gmail = google.gmail({ version: 'v1', auth: authClient })
  gmail.users.messages.send({})
}

module.exports = { getCredLink, getToken, sendMessage }
