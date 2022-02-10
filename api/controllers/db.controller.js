// Database functions
const mongoose = require('mongoose')
const userModel = require('../models/user.model')
const templateModel = require('../models/template.model')
const emailModel = require('../models/email.model')
const fileModel = require('../models/files.model')
const fileHandler = require('./fileHandler.controller')

const getUserData = (email, token) => {
  // console.log(email)
  return new Promise((resolve, reject) => {
    userModel.findOne({ 'user.email': email }, (err, data) => {
      if (err) {
        reject(err)
      } else if (!data) {
        resolve(null)
      } else {
        data.token = JSON.parse(token)
        userModel.findOneAndUpdate({ _id: data._id }, data, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      }
    })
  })
}

const getUserDataById = (id) => {
  // console.log(id)
  return new Promise((resolve, reject) => {
    userModel.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const createUser = (user, token) => {
  return new Promise((resolve, reject) => {
    userModel.create(
      { user, token, _id: mongoose.Types.ObjectId() },
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

const getTemplates = (start) => {
  return new Promise((resolve, reject) => {
    templateModel
      .find({ public: true }, null, { skip: Number(start) * 20, limit: 20 })
      .populate('user')
      .exec((err, template) => {
        if (err) {
          return reject(err)
        }
        resolve(template)
      })
  })
}

const getTemplate = (id) => {
  return new Promise((resolve, reject) => {
    templateModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec((err, template) => {
      if (err) {
        return reject(err)
      }
      resolve(template)
    })
  })
}

const getTemplateCount = () => {
  return new Promise((resolve, reject) => {
    templateModel.countDocuments((err, count) => {
      if (err) {
        return reject(err)
      }
      // console.log(count)
      resolve(count)
    })
  })
}

const createTemplate = (data) => {
  return new Promise((resolve, reject) => {
    templateModel.create(
      { ...data, _id: mongoose.Types.ObjectId() },
      (err, template) => {
        if (err) {
          return reject(err)
        }
        resolve(template)
      }
    )
  })
}

const addLike = (id) => {
  return new Promise((resolve, reject) => {
    templateModel.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } }, (err, template) => {
      if (err) {
        return reject(err)
      }
      resolve(template.likes)
    })
  })
}

const createEmail = (templateId, user, emails, subject) => {
  return new Promise((resolve, reject) => {
    const recipients = emails.map(recipient => ({ email: recipient, read: false }))
    emailModel.create(
      { template: templateId, recipients, user, subject, _id: mongoose.Types.ObjectId() },
      (err, email) => {
        if (err) {
          return reject(err)
        }
        resolve(email)
      }
    )
  })
}

const getEmailsByUser = (email) => {
  return new Promise((resolve, reject) => {
    emailModel.find({ user: email }).populate('template').exec((err, emails) => {
      if (err) {
        return reject(err)
      }
      resolve(emails)
    })
  })
}

const getEmailById = (id) => {
  return new Promise((resolve, reject) => {
    emailModel.findOne({ _id: id }).populate('template').exec((err, email) => {
      if (err) {
        return reject(err)
      }
      resolve(email)
    })
  })
}

const getFileByUserId = (id) => {
  return new Promise((resolve, reject) => {
    fileModel.find({ userId: id }).exec((err, files) => {
      if (err) { return reject(err) }
      resolve(files)
    })
  })
}

const addFiles = async (userId, files) => {
  await Promise.all(files.map(file => (fileHandler.uploadFile(file.path, userId))))
  await fileModel.insertMany(files.map(file => ({
    size: file.size,
    name: file.originalname,
    user: userId,
    path: `${userId}/${file.path.split('/').pop().replace(' ', '+')}`,
    mimeType: file.mimeType
  })))
  Promise.all(files.map(file => fileHandler.unlinkFile(file.path.split('/').pop())))
  return new Promise((resolve, reject) => {
    fileModel.find({ user: userId }).then(resolve).catch(reject)
  })
}

module.exports = {
  getUserData,
  createUser,
  getTemplates,
  getTemplate,
  getUserDataById,
  getTemplateCount,
  createTemplate,
  addLike,
  createEmail,
  getEmailsByUser,
  getEmailById,
  getFileByUserId,
  addFiles
}
