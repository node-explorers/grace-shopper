import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

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
  }
})

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      rating: 6,
      description: '',
      titleValid: true,
      ratingValid: true
    }
  }
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = evt => {
    console.log(evt.target.value)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
  }

  render() {
    const { classes } = this.props
    const width = {
      width: '450'
    }
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Leave A Review</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Leave a review below</DialogContentText>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                name="title"
                id="standard-name"
                label="title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange}
                margin="normal"
              />
              <span className={classes.errors}>title required!</span>

              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Rating</InputLabel>
                <Select
                  value={this.state.rating}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'rating',
                    id: 'age-simple'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1 star</MenuItem>
                  <MenuItem value={2}>2 stars</MenuItem>
                  <MenuItem value={3}>3 stars</MenuItem>
                  <MenuItem value={4}>4 stars</MenuItem>
                  <MenuItem value={5}>5 stars</MenuItem>
                </Select>
                <span className={classes.errors}>rating required!</span>
              </FormControl>
              <TextField
                onChange={this.handleChange}
                id="standard-multiline-static"
                label="description"
                name="description"
                multiline
                rows="9"
                className={classes.textField}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReviewForm)
