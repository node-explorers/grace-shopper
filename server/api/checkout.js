const express = require('express')

const router = express.Router()
const configureStripe = require('stripe')

const stripe = configureStripe('sk_test_rmSfr8bJnXL1aH9TgPV7NnWR')

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log('hereee ')
    console.log(stripeErr)
    res.status(500).send({ error: stripeErr })
  } else {
    res.status(200).send({ success: stripeRes })
  }
}

router.get('/', (req, res) => {
  console.log('in app.get route at /api/checkout')
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString()
  })
})

router.post('/', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res))
})

module.exports = router
