import React, { Component } from 'react'
import { getCategoryItems } from '../store/category'
import MakeCard from './MakeCard'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCartItemThunk } from '../store/cart'
class ProductCategory extends Component {
  constructor() {
    super()
    this.state = {
      category: ''
    }
  }

  componentDidMount() {
    const category = this.props.match.params.name
    this.setState({ category })
    this.props.getCategoryItems(category)
  }

  componentDidUpdate() {
    const category = this.props.match.params.name
    if (this.state.category !== category) {
      this.setState({ category })
      this.props.getCategoryItems(category)
    }
  }

  render() {
    if (!this.props.category) return <div>No Products</div>
    const { classes } = this.props

    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.category.map(product => (
                <Grid key={product.id} item>
                  <MakeCard
                    cart={this.props.cart}
                    addItem={this.props.addItem}
                    product={product}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

function mapStateToProps(state) {
  return {
    category: state.category,
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategoryItems: category => dispatch(getCategoryItems(category)),
    addItem: (productId, cartId, price) => {
      console.log(productId, cartId, price)
      return dispatch(
        addCartItemThunk({
          productId,
          cartId,
          price
        })
      )
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(ProductCategory)
  )
)
