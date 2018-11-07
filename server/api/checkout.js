const express = require('express')

const router = express.Router()
const configureStripe = require('stripe')

const stripe = configureStripe('sk_test_rmSfr8bJnXL1aH9TgPV7NnWR')

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr })
  } else {
    res.status(200).send({ success: stripeRes })
  }
}

router.get('/', (req, res) => {
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString()
  })
})

router.post('/', (req, res) => {
  const { description, source, currency, amount } = req.body

  stripe.charges.create(
    { description, source, currency, amount },
    postStripeCharge(res)
  )
})

module.exports = router
