// GCP bucket handler functions for asset management

const { Storage } = require('@google-cloud/storage')
const storage = new Storage({ keyFilename: 'bucket_key.json' })
const bucket = storage.bucket(process.env.BUCKET_NAME)

const uploadFile = (filePath, userId) => {
  return new Promise((resolve, reject) => {
    const options = {
      destination: `${userId}/${filePath.split('/').pop().replace(' ', '+')}`
    }
    bucket.upload(filePath, options).then(resolve).catch(reject)
  })
}

const getSignedURL = (path) => {
  return new Promise((resolve, reject) => {
    const file = bucket.file(path)
    const config = {
      action: 'read',
      expires: (+new Date()) + 86400000
    }
    file.getSignedUrl(config).then(resolve).catch(reject)
  })
}

const getEmbedLink = (path, days) => {
  return new Promise((resolve, reject) => {
    const file = bucket.file(path)
    const config = {
      action: 'read',
      expires: (+new Date()) + (86400000 * days)
    }
    file.getSignedUrl(config).then(resolve).catch(reject)
  })
}

module.exports = { uploadFile, getSignedURL, getEmbedLink }
