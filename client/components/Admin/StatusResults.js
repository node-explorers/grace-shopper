import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import OrderCard from './orderCard'
import { thunkSearch } from '../../store/order'

function mapState(state) {
  return {
    orders: state.order.ordersByStatus
  }
}
function mapDispatch(dispatch) {
  return {
    fetchSearch: keyword => {
      dispatch(thunkSearch(keyword))
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

class SearchResults extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchSearch(this.props.match.params.status)
  }

  render() {
    if (!this.props.orders) return <div>No order Found In Your Search</div>

    if (!this.props.orders.length > 0)
      return <div>No Order Found In Your Search</div>
    const { classes } = this.props

    return (
      <React.Fragment>
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
export default connect(mapState, mapDispatch)(withStyles(styles)(SearchResults))
