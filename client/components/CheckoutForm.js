import  React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class CheckoutForm extends Component {
  constructor() {
    super()

    this.state = {
      address: '',
      email: '',
      creditCardInfo: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault()
  }

  handleChange(event){
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
     console.log("In the checkout form ", this.state)
  }

  render() {
   return (
      <form onSubmit={this.handleSubmit}>

      <TextField
        helperText="Enter Address"
        onChange={this.handleChange}
        name="address"
        required
      />

      <TextField
        helperText="Enter Email"
        type="email"
        onChange={this.handleChange}
        name="email"
        required
      />

      <TextField
        helperText="Enter Credit Card"
        onChange={this.handleChange}
        name="creditCardInfo"
        required
      />

      <Button
        type="submit"
        size="small"
        color="primary"
       > Submit
       </Button>
      </form>
    );
  }
}

export default CheckoutForm;
