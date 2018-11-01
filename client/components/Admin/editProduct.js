import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { updatingProduct } from '../../store/product'

function mapState(state) {
  return {}
}
function mapDispatch(dispatch) {
  return {
    updating: () => {
      dispatch(updatingProduct())
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

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      categorie: '',
      price: 0.0,
      description: '',
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    this.props.updating(this.state)
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
          id="standard-name"
          label="Name"
          helperText="Please enter name!"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />

        <TextField
          required
          id="standard-categorie"
          label="Categorie"
          defaultValue=""
          value={this.state.categorie}
          helperText="Please enter the categorie!"
          onChange={this.handleChange('categorie')}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-image"
          label="ImageUrl"
          defaultValue=""
          value={this.state.imageUrl}
          helperText="Please enter the categorie!"
          onChange={this.handleChange('imageUrl')}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="standard-description"
          label="Description"
          multiline
          rowsMax="4"
          value={this.state.description}
          onChange={this.handleChange('description')}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          required
          id="standard-price"
          label="Price"
          value={this.state.price}
          onChange={this.handleChange('price')}
          type="number"
          helperText="Please enter the price!"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
      </form>
    )
  }
}

EditProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(EditProduct))
