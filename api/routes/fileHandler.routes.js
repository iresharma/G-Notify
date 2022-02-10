// file handler controller

const path = require('path')
const dir = path.join(path.resolve(path.dirname('')), 'api')
const router = require('express').Router()
const multer = require('multer')
const dbFunction = require('../controllers/db.controller')

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

router.get('/list', async (req, res) => {
  const userId = req.query.user
  const files = await dbFunction.getFileIdsByUserId(userId)
  return res.status(200).send(files)
})

router.post('/upload', upload.any('files'), async (req, res) => {
  const files = req.files
  const resp = await dbFunction.addFiles(req.query.user, files)
  return res.status(200).send(resp)
})

module.exports = router
