const mongoose = require('mongoose')
const templateSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    // email: {
    //   type: String,
    //   lowercase: true,
    //   match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/
    // },
    user: mongoose.Schema.Types.ObjectId,
    content: String
  },
  { database: 'g-notify', collection: 'templates' }
)
module.exports = mongoose.model('Template', templateSchema)
