import React from 'react'
import ChekoutStripe from './components/Checkout/CheckoutForm'
import { Navbar } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Routes />
      <ChekoutStripe
        name="Credit Card"
        description="verification"
        amount={1243}
      />
    </div>
  )
}

export default App
