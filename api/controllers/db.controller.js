// Database functions
const mongoose = require('mongoose')
const userModel = require('../models/user.model')

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
    userModel.create({ user, token, _id: mongoose.Types.ObjectId() }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = { getUserData, createUser }
