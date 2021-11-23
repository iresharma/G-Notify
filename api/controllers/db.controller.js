// Database functions
const mongoose = require('mongoose')
const userModel = require('../models/user.model')
const templateModel = require('../models/template.model')

const getUserData = (email) => {
  console.log(email)
  return new Promise((resolve, reject) => {
    userModel.findOne({ 'user.email': email }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const getUserDataById = (id) => {
  console.log(id)
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
      .find({}, null, { skip: Number(start) * 20, limit: 20 })
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
    templateModel.findOne({ _id: id }).exec((err, template) => {
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
      console.log(count)
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

module.exports = {
  getUserData,
  createUser,
  getTemplates,
  getTemplate,
  getUserDataById,
  getTemplateCount,
  createTemplate
}
