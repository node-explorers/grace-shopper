import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/product'
import history from '../history'
import { Link } from 'react-router-dom'

import MakeCard from './MakeCard'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { addCartItemThunk } from '../store/cart'

function mapState(state) {
  return {
    products: state.products.products
  }
}
function mapDispatch(dispatch) {
  return {
    fetchingProduct: () => {
      dispatch(fetchProducts())
    }
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

export class AllProduct extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchingProduct()
  }
  render() {
    if (!this.props.products) return <div>No Products</div>

    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24}>
          {this.props.products.map(product => (
            <div key={product.id}>
              <MakeCard product={product} />
            </div>
          ))}
        </Grid>
      </div>
    )
  }
}
export default connect(mapState, mapDispatch)(withStyles(styles)(AllProduct))
