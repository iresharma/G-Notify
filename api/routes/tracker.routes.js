// Tracking routes

const router = require('express').Router()

router.get('/:template_id/:email', (req, res) => {
  console.log(res.params.template_id)
  console.log(res.params.email)
  res.send('tracking')
})

module.exports = router
