import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_OPpoAfjmyeTltfqxtGlndpfh'
    : 'pk_test_OPpoAfjmyeTltfqxtGlndpfh'

const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '/api/checkout' : '/api/checkout'

const CURRENCY = 'USD'

const fromDollarToCent = amount => Math.round(amount * 100)

const successPayment = async data => {
  console.log(data)
  const email = (await axios.post('/api/email', {
    verification: data.data.success.id,
    amount: data.data.success.amount,
    email: data.data.success.source.name
  })).data
  console.log(email)

  alert('Payment Successful, an email is on the way with your purchase info!!')
}

const errorPayment = data => {
  console.log(data)
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
