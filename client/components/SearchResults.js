import React from 'react'
import { connect } from 'react-redux'
import { searchProduct } from '../store/product'
import history from '../history'
import { Link } from 'react-router-dom'

import MakeCard from './MakeCard'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { addCartItemThunk } from '../store/cart'

function mapState(state) {
  return {
    searchResults: state.products.searchResults,
    cart: state.cart
  }
}
function mapDispatch(dispatch) {
  return {
    fetchSearchProducts: keyword => {
      dispatch(searchProduct(keyword))
    },
    addItem: (productId, cartId, price) =>
      dispatch(
        addCartItemThunk({
          productId,
          cartId,
          price
        })
      )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'baseline'
  }
})

export class SearchResults extends React.Component {
  constructor() {
    super()
    this.state = {
      keyword: ''
    }
  }

  componentDidMount() {
    const keyword = this.props.match.params.keyword
    this.setState({ keyword })
    this.props.fetchSearchProducts(keyword)
  }

  componentDidUpdate() {
    const keyword = this.props.match.params.keyword
    if (this.state.keyword !== keyword) {
      this.setState({ keyword })
      this.props.fetchSearchProducts(keyword)
    }
  }

  render() {
    if (!this.props.searchResults)
      return <div>No Products Found In Your Search</div>

    if (!this.props.searchResults.length > 0)
      return <div>No Products Found In Your Search</div>
    const { classes } = this.props

    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.searchResults.map(product => (
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
export default connect(mapState, mapDispatch)(withStyles(styles)(SearchResults))
