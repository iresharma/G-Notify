const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const basicRouter = require('./routes/basic.routes')
const templateRouter = require('./routes/template.routes')
const emailRouter = require('./routes/emails.routes')
const trackerRouter = require('./routes/tracker.routes')
const fileManagerRouter = require('./routes/fileHandler.routes')

const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const dbURI = process.env.dbURI || ''

mongoose
  .connect(dbURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

app.use('/', basicRouter)
app.use('/templates', templateRouter)
app.use('/emails', emailRouter)
app.use('/tracking', trackerRouter)
app.use('/files', fileManagerRouter)

export default {
  path: '/api',
  handler: app
}
