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
        helperText="Enter your address"
        value={this.state.address}
        onChange={this.handleChange}
      />

      <TextField
        helperText="Enter your Email"
        value={this.state.address}
        onChange={this.handleChange}
      />

      <TextField
        helperText="Enter your Credit Card Info"
        value={this.state.address}
        onChange={this.handleChange}
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
