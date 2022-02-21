# G-notify

G-notify is a mass mailer written in nuxt snd express without  any third party libraries like (nodemailer).
We directly contact GAPIs to send the mail.

### Deplyment Status

[landing](https://g-notify-landing.netlify.app) [![Netlify Status](https://api.netlify.com/api/v1/badges/6605941a-8232-4d5b-9869-8722f91ca31d/deploy-status)](https://app.netlify.com/sites/g-notify-landing/deploys)

[G-notify](https://g-notify.netlify.app) [![Netlify Status](https://api.netlify.com/api/v1/badges/fff5718f-e1d1-49ca-94e1-f9bf0b2499b4/deploy-status)](https://app.netlify.com/sites/g-notify/deploys)

## Features
- [x] Template collection 
- [x] create template -
- [x] upload template 
- [x] send single template 
- [x] send multiple template 
- [x] asset management for people to upload files for hosting, basically a cdn mainly for images but also supports other things
- [ ] tracking
- [ ] stats
## how to start using
- create a .env file with the following variables
  ```bash
    GMAIL_CLIENT_ID="your client id"
    GMAIL_CLIENT_SECRET="your client secret"
    GMAIL_REDIRECT_URL="your redirect url"
    dbURI="your mongodb url"
    BASEURL="http://localhost:3000"
    BUCKET_NAME="your gcp bucket name"
  ```

  **you'd also need a service account json named `bucket_key.json`  with suitable permissions and saved in the root folder of the project**