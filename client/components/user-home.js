import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddProduct from './Admin/addProduct'
import { fetchCartThunk } from '../store/cart'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props
  //props.cartObj()
  return (
    <div>
      <h3>Welcome, {email}</h3>
      {props.isAdmin && <AddProduct />}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart,
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

function mapDispatch(dispatch) {
  return {
    cartObj: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
