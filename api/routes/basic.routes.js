// Routes go here and

const router = require('express').Router()
const dbFunction = require('../controllers/db.controller')
// eslint-disable-next-line no-unused-vars
const gmail = require('../controllers/gmail.controller')

router.get('/', (req, res) => {
  return res.send('Hello World')
})

router.get('/auth', async (req, res) => {
  if (req.headers.authorization) {
    const clientId = req.query.clientId
    // eslint-disable-next-line no-unused-vars
    const userData = await dbFunction.getUserData(clientId)
    // TODO: put user creds and token in a global variable
  } else {
    const link = await gmail.getCredLink()
    return res.send(link)
  }
  return res.send('Hello World')
})

router.post('/auth', async (req, res) => {
  const code = req.body.code
  const token = await gmail.getToken(code)
  console.log(token)
  const UID = dbFunction.createUser(token)
  console.log(UID)
  return res.send(UID)
})

module.exports = router
