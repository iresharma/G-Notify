const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const basicRouter = require('./routes/basic.routes')
const templateRouter = require('./routes/template.routes')
const emailRouter = require('./routes/emails.routes')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dbURI = process.env.dbURI || ''
console.log(dbURI)

mongoose
  .connect(dbURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))
console.log('hello')

mongoose.Promise = global.Promise

app.use('/', basicRouter)
app.use('/templates', templateRouter)
app.use('/emails', emailRouter)

export default {
  path: '/api',
  handler: app
}
