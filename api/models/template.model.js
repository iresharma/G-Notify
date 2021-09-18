const mongoose = require('mongoose')
const templateSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: String
  },
  { database: 'g-notify', collection: 'templates' }
)
module.exports = mongoose.model('Template', templateSchema)
