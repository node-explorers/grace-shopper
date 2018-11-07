const express = require('express')
const router = express.Router()
const sendgrid = require('sendgrid')(process.env.SENDGRID_API)
const helper = require('sendgrid').mail

const Cart = require('../db/models/cart')
const CartItems = require('../db/models/cartItems')
const User = require('../db/models/user')

//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

//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

router.post('/', async (req, res, next) => {
  try {
    const fromEmail = new helper.Email('nodeexplorers@gmail.com')
    const toEmail = new helper.Email(req.body.email)
    const subject = 'Orders received'
    const content = new helper.Content(
      'text/plain',
      `Hello,\nYour order has been received and is now being process.Your order details are shown below for your reference:\n-Verification id:${
        req.body.verification
      } \n-Amount:${req.body.amount}\n-Items:`
    )
    const mail = new helper.Mail(fromEmail, subject, toEmail, content)

    const request = sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    })
    try {
      await CartItems.destroy({
        where: {
          cartId: req.body.cartId
        }
      })
    } catch (err) {
      next(err)
    }
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
