import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/product'
import history from '../history'
import { Link } from 'react-router-dom'

import MakeCard from './MakeCard'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Card } from '@material-ui/core'

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
    flexGrow: 1,
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'baseline'
  }
})

export class AllProduct extends React.Component {
  componentDidMount() {
    this.props.fetchingProduct()
  }

  render() {
    if (!this.props.products) return <div>No Products</div>

    const { classes } = this.props

    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.products.map(product => (
                <Grid key={product.id} item>
                  <MakeCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}
export default connect(mapState, mapDispatch)(withStyles(styles)(AllProduct))
