import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { deleteCartItems } from '../../store/cart'
import store from '../../store'
import history from '../../history'
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

const successPayment = async (data, cartId) => {
  try {
    await axios.post('/api/email', {
      verification: data.data.success.id,
      amount: data.data.success.amount,
      email: data.data.success.source.name,
      cartId
    }).data
    store.dispatch(deleteCartItems())
    history.push('/home')
  } catch (err) {
    console.error(err)
  }

  alert('Payment Successful, an email is on the way with your purchase info!!')
}

const errorPayment = data => {
  console.log(data)
  alert('Payment Error')
}

// NEEDS BACKEND =============>>>>>>>>>>>>>>>>>>>>

const onToken = (amount, description, cartId) => token => {
  return axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount),
      cartId
    })
    .then(data => successPayment(data, cartId))
    .catch(errorPayment)
}
//SYNTAX FOR RENDERING CHECKOUT FORM ============>>>>>>>>>>
//<Checkout name="Credit Card" description="verification" amount={dollar.cents} />

const Checkout = ({ name, description, amount, cartId }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description, cartId)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Checkout
