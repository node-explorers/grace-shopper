import React from 'react'

import { Navbar, AllProduct, SingleProduct } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllProduct />
    </div>
  )
}

export default App
