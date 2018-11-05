import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { update } from '../../store/order'
import Button from '@material-ui/core/Button'

function mapState(state) {
  return {
    order: state.order.singleOrder
  }
}
function mapDispatch(dispatch) {
  return {
    updating: obj => {
      dispatch(update(obj))
    }
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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

class EditOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      status: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    this.props.updating({ id: this.props.order.id, status: this.state.status })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props

    return (
      <form onSubmit={this.handleSubmit} className={classes.container}>
        <TextField
          required
          id="standard-status"
          label="Status"
          helperText="Please enter the status!"
          className={classes.textField}
          value={this.state.status}
          onChange={this.handleChange('status')}
          margin="normal"
        />
        <Button type="submit" size="small" color="primary">
          Update
        </Button>
      </form>
    )
  }
}

EditOrder.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(EditOrder))
