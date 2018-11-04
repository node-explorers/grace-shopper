import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      rating: null,
      description: ''
    }
  }

  handleChange = evt => {
    console.log(this.state.title)
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
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          name="title"
          id="standard-name"
          label="title"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
        />
      </form>
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
