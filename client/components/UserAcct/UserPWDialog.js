import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import axios from 'axios'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  errors: {
    backgroundColor: 'yellow'
  },
  buttonColor: {
    backgroundColor: 'lightBlue'
  }
})

class PasswordReset extends Component {
  constructor() {
    super()
    this.state = {
      password1: '',
      password2: '',
      open: true,
      isValid: true
    }
    // this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  // handleClickOpen = () => {
  //   this.setState({ open: true })
  // }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleClose = async () => {
    try {
      if (this.state.password1 === this.state.password2) {
        await axios.put(`/api/users/password/${this.props.id}`, {
          newPassword: this.state.password1
        })
        this.setState({
          open: false,
          isValid: true
        })
      } else {
        this.setState({
          isValid: false
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { classes, isOpen } = this.props

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter a new password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please reset your password below
            </DialogContentText>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                name="password1"
                id="standard-name"
                label="Enter new password"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange}
                margin="normal"
              />

              <TextField
                name="password2"
                id="standard-name"
                label="Confirm new password"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange}
                margin="normal"
              />
              {!this.state.isValid ? (
                <span className={classes.errors}>Passwords must match!</span>
              ) : null}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Reset</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    id: state.user.id
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PasswordReset))
