// Routes go here and

const router = require('express').Router()
const dbFunction = require('../controllers/db.controller')
const gmail = require('../controllers/gmail.controller')

router.get('/', (req, res) => {
  return res.send('Hello World')
})

router.get('/auth', async (req, res) => {
  let link
  try {
    link = await gmail.getCredLink()
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
  return res.send(link)
})

router.post('/auth', async (req, res) => {
  const code = req.body.code
  let token
  try {
    token = await gmail.getToken(code)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
  try {
    const userInfo = await gmail.loadUser(JSON.stringify(token))
    // console.log(userInfo)
    const userData = await dbFunction.getUserData(userInfo.data.emailAddress, JSON.stringify(token))
    // console.log(userData)
    if (userData) {
      return res.status(200).send({ new: false, userData })
    } else {
      const user = await dbFunction.createUser({ email: userInfo.data.emailAddress }, token)
      // console.log({ new: true, ...user })
      return res.status(200).send({ new: true, userData: user })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

module.exports = router
