const mongoose = require('mongoose')
const emailsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template'
    },
    user: Object,
    recipients: [{
      type: Object
    }],
    subject: String
  },
  { database: 'g-notify', collection: 'emails' }
)
module.exports = mongoose.model('Emails', emailsSchema)
