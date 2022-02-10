// Emailing related routes go here

const path = require('path')
const dir = path.join(path.resolve(path.dirname('')), 'api')
const router = require('express').Router()
const multer = require('multer')
const dbFunction = require('../controllers/db.controller')
const emailFunction = require('../controllers/gmail.controller')
const fileHandler = require('../controllers/fileHandler.controller')

const storage = multer.diskStorage({
  destination: `${dir}/upload`,
  // overwriting the filename with an inline function to replace spaces to '-', making it better for URLs
  filename: (_, file, cb) => {
    cb(null, file.originalname.replace(' ', '-'))
  }
})

const upload = multer({
  storage
})

router.get('/sendTest', async (req, res) => {
  const userId = req.query.user
  const templateId = req.query.template
  const user = await dbFunction.getUserDataById(userId)
  // console.log(user)
  const template = await dbFunction.getTemplate(templateId)
  try {
    emailFunction.sendSingleMessage(JSON.stringify(user.token), template.content, user.user.email, user.user.email, 'Test Email from G-Notify', 'plainText')
  } catch (err) {
    // console.log(err)
  }
  res.send('Email sent')
})

router.post('/importExcel', upload.single('excel'), async (req, res) => {
  try {
    const list = await fileHandler.readExcel(req.file.path.split('/').pop().replace(' ', '+'))
    return res.status(200).send({ list })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ err })
  }
})

router.post('/sendEmails', async (req, res) => {
  const { templateId, subject, emails, enableTracking } = req.body
  const template = await dbFunction.getTemplate(templateId)
  const user = await dbFunction.getUserDataById(req.query.userId)
  const email = await dbFunction.createEmail(templateId, user.user.email, emails, subject)
  if (enableTracking) {
    try {
      // await tracking
    } catch (err) {
      console.log(err)
      return res.status(500).send({ err })
    }
  }
  try {
    await emailFunction.sendMultipleMails(JSON.stringify(user.token), template.content, emails, user.user.email, subject, template.plainText)
    return res.status(200).send({ message: 'Emails sent', emailId: email._id })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ err })
  }
})

router.get('/list/:user', async (req, res) => {
  const emails = await dbFunction.getEmailsByUser(req.params.user)
  return res.status(200).send({ emails })
})

router.get('/:id', async (req, res) => {
  const email = await dbFunction.getEmailById(req.params.id)
  return res.status(200).send({ email })
})

module.exports = router
