// Emailing related routes go here

const router = require('express').Router()
const dbFunction = require('../controllers/db.controller')
const emailFunction = require('../controllers/gmail.controller')

router.get('/sendTest', async (req, res) => {
  const userId = req.query.user
  const templateId = req.query.template
  const user = await dbFunction.getUserDataById(userId)
  console.log(user)
  const template = await dbFunction.getTemplate(templateId)
  try {
    emailFunction.sendSingleMessage(JSON.stringify(user.token), template.content, user.user.email, user.user.email, 'Test Email from G-Notify', 'plainText')
  } catch (err) {
    console.log(err)
  }
  res.send('Email sent')
})

module.exports = router
