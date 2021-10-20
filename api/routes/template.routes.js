// Template related routes go here

const router = require('express').Router()
const dbFunction = require('../controllers/db.controller')
const puppeteerController = require('../controllers/puppeteer.controller')
const fileHandler = require('../controllers/fileHandler.controller')

router.get('/', async (req, res) => {
  const templates = await dbFunction.getTemplates(req.query.page)
  return res.status(200).send({ templates })
})

router.get('/count', async (_, res) => {
  const count = await dbFunction.getTemplateCount()
  return res.status(200).send({ count })
})

router.get('/renderTemplate', async (req, res) => {
  const template = await dbFunction.getTemplate(req.query.id)
  const image = await puppeteerController.templateScreenshot(template.content, req.query.quality)
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': image.length
  })
  res.end(image)
})

router.post('/readTemplate', async (req, res) => {
  const template = await fileHandler.readTemplate(req.body.file)
  return res.status(200).send({ template })
})

module.exports = router
