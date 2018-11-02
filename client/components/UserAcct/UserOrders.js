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

const dummyItems = [
  {
    id: 1,
    quantity: 2,
    price: 100,
    orderId: 1,
    productId: 1
  },
  {
    id: 2,
    quantity: 1,
    price: 125,
    orderId: 1,
    productId: 2
  }
]

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
  componentDidMount() {
    // grab order data from DB
    // need a backend first tho
    // const dummyOrder = [
    //   {
    //     id: 1,
    //     totalPrice: 456.99,
    //     status: 'received',
    //     address: '672 OakPineBirch Ln',
    //     email: 'murphy@email.com',
    //     userId: 1,
    //     createdAt: '2018-11-02 13:47:10.879905-05'
    //   }
    // ]
    // this.props.orders = [
    //   {
    //     id: 1,
    //     totalPrice: 456.99,
    //     status: 'received',
    //     address: '672 OakPineBirch Ln',
    //     email: 'murphy@email.com',
    //     userId: 1,
    //     createdAt: '2018-11-02 13:47:10.879905-05'
    //   }
    // ]
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
    } else return <div />
  }
}

UserOrders.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    orders: [
      {
        id: 1,
        totalPrice: 456.99,
        status: 'received',
        address: '672 OakPineBirch Ln',
        email: 'murphy@email.com',
        userId: 1,
        createdAt: '2018-11-02 13:47:10.879905-05'
      }
    ]
  }
}

export default connect(mapStateToProps)(withStyles(styles)(UserOrders))
