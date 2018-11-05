const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.send('hello ================')
})

module.exports = router
