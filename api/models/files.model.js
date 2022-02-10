const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    path: String,
    size: Number,
    mimeType: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  },
  { database: 'g-notify', collection: 'files' }
)
module.exports = mongoose.model('Files', fileSchema)
