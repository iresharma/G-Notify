// Tracking routes

const router = require('express').Router()
const trackerHandler = require('../controllers/tracker.controller')
const fileHandler = require('../controllers/fileHandler.controller')

router.get('/:templateId/:email', async (req, res) => {
  const { templateId, email } = req.params
  if (!templateId) {
    return res.status(400).send('Template id not found')
  } if (!email) {
    return res.status(400).send('Email not found')
  }
  try {
    await trackerHandler.addReadEntry(templateId, email)
    return res.status(200).sendFile(fileHandler.trackerFilePath())
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

module.exports = router
