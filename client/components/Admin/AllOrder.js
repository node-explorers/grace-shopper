import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import { Link } from 'react-router-dom'
import OrderCard from './orderCard'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { thunkOrders } from '../../store/order'
import SearchStatus from './searchStatus'

function mapState(state) {
  return {
    products: state.products.products,
    cart: state.cart,
    orders: state.order.orders
  }
}
function mapDispatch(dispatch) {
  return {
    fetchingOrder: () => {
      dispatch(thunkOrders())
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

export class AllOrder extends React.Component {
  componentDidMount() {
    this.props.fetchingOrder()
  }

  render() {
    //console.log(this.props.orders)
    const { classes } = this.props
    if (!this.props.orders) {
      return <div>Empty</div>
    }
    return (
      <React.Fragment>
        <div>
          <SearchStatus />
        </div>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.orders.map(order => (
                <Grid key={order.id} item>
                  <OrderCard order={order} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}
export default connect(mapState, mapDispatch)(withStyles(styles)(AllOrder))
