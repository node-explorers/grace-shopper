import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddProduct from './Admin/addProduct'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props

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
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
