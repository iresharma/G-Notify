const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    // email: {
    //   type: String,
    //   lowercase: true,
    //   match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?                  ^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/
    // },
    token: Object,
    user: Object
  },
  { database: 'g-notify', collection: 'users' }
)
module.exports = mongoose.model('User', userSchema)
