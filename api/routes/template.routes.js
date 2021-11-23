// Template related routes go here
const path = require('path')
const dir = path.join(path.resolve(path.dirname('')), 'api')
const router = require('express').Router()
const multer = require('multer')
const dbFunction = require('../controllers/db.controller')
const puppeteerController = require('../controllers/puppeteer.controller')
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

router.post('/readTemplate', upload.single('file'), async (req, res) => {
  const template = await fileHandler.readTemplate(req.file.path.split('/').pop())
  return res.status(200).send({ template })
})

module.exports = router
