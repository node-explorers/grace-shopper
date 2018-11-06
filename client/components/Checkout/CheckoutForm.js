import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_OPpoAfjmyeTltfqxtGlndpfh'

const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://myapidomain.com'
    : '/api/checkout'

const CURRENCY = 'USD'

const fromDollarToCent = amount => Math.round(amount * 100)

const successPayment = data => {
  console.log(data)
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

// NEEDS BACKEND =============>>>>>>>>>>>>>>>>>>>>

const onToken = (amount, description) => token => {
  return axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)
}
//SYNTAX FOR RENDERING CHECKOUT FORM ============>>>>>>>>>>
//<Checkout name="Credit Card" description="verification" amount={dollar.cents} />

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Checkout
