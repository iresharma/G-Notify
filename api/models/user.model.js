const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    token: Object,
    user: Object,
    emails: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'emails'
    }]
  },
  { database: 'g-notify', collection: 'users' }
)
module.exports = mongoose.model('User', userSchema)
