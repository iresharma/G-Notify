# G-notify

G-notify is a mass mailer written in nuxt snd express without  any third party libraries like (nodemailer).
We directly contact GAPIs to send the mail.

## Features
- Template collection - (done)
- create template -  (done)
- upload template - (done)
- send single template - (done)
- send multiple template - (done)
- tracking
- stats
## how to start using
- create a .env file with the following variables
  ```bash
    GMAIL_CLIENT_ID="your client id"
    GMAIL_CLIENT_SECRET="your client secret"
    GMAIL_REDIRECT_URL="your redirect url"
    dbURI="your mongodb url"
    BASEURL="http://localhost:3000"
  ```