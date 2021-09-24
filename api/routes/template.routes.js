// Template related routes go here

const router = require('express').Router()
// const dbFunction = require('../controllers/db.controller')

router.get('/', (req, res) => {
  return res.status(200).send('hi')
})

module.exports = router
