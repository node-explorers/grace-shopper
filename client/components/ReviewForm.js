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
import axios from 'axios'
import { addNewReviewThunk } from '../store/reviews'

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

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      rating: 6,
      description: '',
      titleValid: true,
      ratingValid: true,
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = async () => {
    if (this.state.title && this.state.rating < 6) {
      //dispatch post request
      const bodyObj = {
        title: this.state.title,
        rating: this.state.rating,
        description: this.state.description,
        productId: this.props.id
      }
      if (this.props.user.id) {
        bodyObj.userId = this.props.user.id
      }
      try {
        await this.props.addReview(bodyObj)
      } catch (err) {
        console.error(err)
      }
      this.setState({
        open: false,
        rating: 6,
        ratingValid: true,
        titleValid: true,
        title: ''
      })
    } else {
      let ratingState = this.state.rating < 6
      this.setState(prevProps => ({
        titleValid: !!prevProps.title,
        ratingValid: ratingState
      }))
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  forceClose = () => {
    this.setState({
      open: false
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Button className={classes.buttonColor} onClick={this.handleClickOpen}>
          Leave A Review
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Leave a helpful review, make sure to include a star rating!
            </DialogContentText>
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
              {this.state.titleValid ? null : (
                <span className={classes.errors}> title required!</span>
              )}

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
                  <MenuItem value={0}>0 stars</MenuItem>

                  <MenuItem value={1}>1 star</MenuItem>
                  <MenuItem value={2}>2 stars</MenuItem>
                  <MenuItem value={3}>3 stars</MenuItem>
                  <MenuItem value={4}>4 stars</MenuItem>
                  <MenuItem value={5}>5 stars</MenuItem>
                </Select>
                {this.state.ratingValid ? null : (
                  <span className={classes.errors}> rating required!</span>
                )}
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
            <Button onClick={this.forceClose} color="primary">
              Close
            </Button>
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
    user: state.user,
    id: state.products.singleProduct.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: body => dispatch(addNewReviewThunk(body))
  }
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ReviewForm)
)
