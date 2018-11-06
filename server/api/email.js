const express = require('express')
const router = express.Router()
const sendgrid = require('sendgrid')(
  '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'
)
const helper = require('sendgrid').mail
const fromEmail = new helper.Email('nodeexplorers@gmail.com')
const toEmail = new helper.Email('gkane6@student.cscc.edu')
const subject = 'Sending with SendGrid is Fun'
const content = new helper.Content(
  'text/plain',
  'and easy to do anywhere, even with Node.js'
)
const mail = new helper.Mail(fromEmail, subject, toEmail, content)

const Cart = require('../db/models/cart')
const CartItems = require('../db/models/cartItems')
const User = require('../db/models/user')

//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

router.post('/', (req, res, next) => {
  try {
    const request = sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    })

    sendgrid.API(request, function(error, response) {
      if (error) {
        console.log('Error response received')
      }
      /* console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers) */
      res.send('ok')
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
