// Routes go here and

const router = require('express').Router()
const dbFunction = require('../controllers/db.controller')
const gmail = require('../controllers/gmail.controller')

router.get('/', (req, res) => {
  return res.send('Hello World')
})

router.get('/auth', async (req, res) => {
  if (req.headers.authorization) {
    const clientId = req.query.clientId
    try {
      // eslint-disable-next-line no-unused-vars
      const userData = await dbFunction.getUserData(clientId)
      return res.send(userData)
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
    // TODO: put user creds and token in a global variable
  } else {
    let link
    try {
      link = await gmail.getCredLink()
    } catch (err) {
      console.error(err)
      return res.status(500).send(err)
    }
    return res.send(link)
  }
})

router.post('/auth', async (req, res) => {
  const code = req.body.code
  let token, user
  try {
    token = await gmail.getToken(code)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
  try {
    user = await dbFunction.createUser(req.body.user, token)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
  return res.send(user)
})

module.exports = router
