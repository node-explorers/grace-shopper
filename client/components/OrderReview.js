import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CheckoutStripe from './Checkout/CheckoutForm'
import { fetchCartThunk } from '../store/cart'
import { connect } from 'react-redux'

//import CheckoutForm from './CheckoutForm';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
})

class OrderReview extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  totalPrice = () => {
    let total = 0
    this.props.cart.cartItems.forEach(item => {
      total += item.quantity * +item.price
    })
    return Number(total).toFixed(2)
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Item Name</CustomTableCell>
              <CustomTableCell>Price</CustomTableCell>
              <CustomTableCell>Quantity</CustomTableCell>
            </TableRow>
          </TableHead>

          {this.props.cart.cartItems && (
            <TableBody>
              {this.props.cart.cartItems.map(item => {
                return (
                  <TableRow key={item.id}>
                    <CustomTableCell>{item.product.name}</CustomTableCell>
                    <CustomTableCell>{item.price}</CustomTableCell>
                    <CustomTableCell>{item.quantity}</CustomTableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <h3> Total: $</h3>
                {this.totalPrice()}
              </TableRow>
            </TableBody>
          )}
        </Table>
        <CheckoutStripe
          name="Credit Cart"
          description="verification"
          amount={this.totalPrice()}
        />
      </Paper>
    )
  }
}

OrderReview.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(OrderReview)
)
