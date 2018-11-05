import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createOrder } from '../store'

class CheckoutForm extends Component {
  constructor() {
    super()

    this.state = {
      address: '',
      email: '',
      creditCardInfo: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const cartInfo = this.state
    console.log(cartInfo)
    this.props.createOrder(cartInfo)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('In the checkout form ', this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          helperText="Enter Address"
          onChange={this.handleChange}
          name="address"
          placeholder="400 Main St. Chicago"
          required
        />

        <TextField
          helperText="Enter Email"
          type="email"
          onChange={this.handleChange}
          name="email"
          placeholder="drone@globex.com"
          pattern=".+@globex.com" //validate email to include @ & .com
          required
        />

        <Button type="submit" size="small" color="primary">
          {' '}
          Submit
        </Button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  createOrder: cartInfo => dispatch(createOrder(cartInfo))
})

export default connect(null, mapDispatch)(CheckoutForm)
