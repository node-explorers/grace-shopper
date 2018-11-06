import React from 'react'
import UserPWDialog from './UserAcct/UserPWDialog'

const Home = props => {
  return (
    <div>
      <img
        style={{ float: 'right', width: '100vw' }}
        src="/pictures/products/Gran-Paradiso-hike_cs.jpg"
      />
      {props.reset ? <UserPWDialog /> : null}
    </div>
  )
}

export default Home
