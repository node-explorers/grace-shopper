import React from 'react'

import { Navbar } from './components'
import Routes from './routes'

import Checkout from './components/checkout/CheckoutForm'

const App = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Routes />
      <Checkout name="YOUR NAME!" description="HELLO DESC" amount={1} />
    </div>
  )
}

export default App
