// Database functions
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
    userModel.create({ ...user, token }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = { getUserData, createUser }
