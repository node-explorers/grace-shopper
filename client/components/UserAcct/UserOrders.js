import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { create } from 'jss'
import { fetchSingleUserOrdersThunk } from '../../store/orders'

const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})

function createData(id, price, status, date) {
  return { id, price, status, date }
}

class UserOrders extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    // grab order data from DB
    if (this.props.user.id) {
      this.props.fetchUserOrders(this.props.user.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.props.fetchUserOrders(this.props.user.id)
    }
  }

  render() {
    const { classes } = this.props
    let rows
    if (this.props.orders.length) {
      rows = this.props.orders.map(order => {
        return createData(
          order.id,
          order.totalPrice,
          order.status,
          order.createdAt
        )
      })

      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Amount Paid</TableCell>
                <TableCell>Placed On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => {
                console.log(row)
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.status}
                    </TableCell>
                    <TableCell numeric>{row.price}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      )
    } else return <span>BUY SOME STUFF!</span>
  }
}

UserOrders.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserOrders: id => dispatch(fetchSingleUserOrdersThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserOrders)
)
