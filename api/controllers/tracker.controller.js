// Tracking functions
import { addEmailRead } from './db.controller'

const addReadEntry = (id, email) => {
  return new Promise((resolve, reject) => {
    try {
      addEmailRead(id, email)
    } catch (err) { return reject(err) }
    return resolve()
  })
}

module.exports = { addReadEntry }
