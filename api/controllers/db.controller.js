// Database functions
const mongoose = require('mongoose')
const userModel = require('../models/user.model')
const templateModel = require('../models/template.model')

const getUserData = (user) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({}, (err, data) => {
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
      .find({}, {}, { skip: Number(start) * 20, limit: 20 })
      .populate('users')
      .exec((err, template) => {
        if (err) {
          return reject(err)
        }
        resolve(template)
      })
  })
}

module.exports = { getUserData, createUser, getTemplates }
