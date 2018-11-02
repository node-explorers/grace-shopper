import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { postingProduct } from '../../store/product'
import Button from '@material-ui/core/Button'

/* function mapState(state) {
  return {}
} */
function mapDispatch(dispatch) {
  return {
    post: product => dispatch(postingProduct(product))
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

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      category: '',
      price: 0.0,
      description: '',
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    this.props.post({
      name: this.state.name,
      category: this.state.category,
      price: this.state.price,
      description: this.state.description,
      imageUrl: this.state.imageUrl
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <h2>Add Product</h2>
        <br />
        <hr />
        <br />
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
            id="standard-category"
            label="Category"
            defaultValue=""
            value={this.state.category}
            helperText="Please enter the category!"
            onChange={this.handleChange('category')}
            className={classes.textField}
            margin="normal"
          />

          <TextField
            id="standard-image"
            label="ImageUrl"
            defaultValue=""
            value={this.state.imageUrl}
            onChange={this.handleChange('imageUrl')}
            className={classes.textField}
            margin="normal"
          />

          <TextField
            id="standard-description"
            label="Description"
            rowsMax="1"
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
          <Button type="submit" size="small" color="primary">
            Add Product
          </Button>
        </form>
      </div>
    )
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(null, mapDispatch)(withStyles(styles)(AddProduct))
