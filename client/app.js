import React from 'react'

import { Navbar } from './components'
import Routes from './routes'

import Cart from './components/Cart'

const App = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Routes />
    </div>
  )
}

export default App
