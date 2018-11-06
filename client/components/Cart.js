import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import CheckoutForm from './CheckoutForm'

import {
  fetchCartThunk,
  deleteCartItemThunk,
  incrementCartItemThunk
} from '../store/cart'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

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

function createData(id, name, quantity, price) {
  return { id, name, quantity, price }
}

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      isHidden: true,
      price: 0
    }
  }
  componentDidMount() {
    this.priceSetter()
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) this.priceSetter()
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  incrementer = async (id, currQuant, event) => {
    if (currQuant === 0 && event.target.name === 'decrementer') return
    const dispatchObject = {
      id,
      style: event.target.name
    }

    await this.props.increment(dispatchObject)

    this.priceSetter()
  }

  priceSetter = () => {
    if (this.props.cart.cartItems) {
      let sum = 0
      this.props.cart.cartItems.forEach(element => {
        sum += element.quantity * +element.price
      })
      this.setState({
        price: `$ ${Number(sum).toFixed(2)}`
      })
    }
  }

  handleCheckout = evt => {
    //do this on checkout
  }

  //remove item from cart
  handleRemove = async productId => {
    await this.props.deleteItem(productId)

    this.priceSetter()
  }

  render() {
    const { classes } = this.props
    const padding = {
      paddingTop: '12vh'
    }
    const color = {
      backgroundColor: 'black',
      color: 'red',
      fontWeight: '900'
    }
    const bold = {
      fontWeight: 'bold'
    }

    let rows
    if (this.props.cart.cartItems) {
      rows = this.props.cart.cartItems.map(item =>
        createData(item.id, item.product.name, item.quantity, item.price)
      )
    }
    return (
      <Fragment>
        <h2 style={padding}>Your Cart!</h2>
        <div>
          {!this.props.cart.cartItems ? (
            <p>No Items</p>
          ) : (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell numeric>Price</TableCell>
                    <TableCell numeric>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" style={bold}>
                          <button
                            type="button"
                            onClick={() => this.handleRemove(row.id)}
                            style={color}
                          >
                            X
                          </button>
                          &ensp; {row.name}
                        </TableCell>
                        <TableCell numeric>{row.price}</TableCell>
                        <TableCell numeric>
                          {row.quantity} &ensp;
                          <button
                            type="button"
                            name="incrementer"
                            onClick={e =>
                              this.incrementer(row.id, row.quantity, e)
                            }
                          >
                            +
                          </button>
                          <button
                            type="button"
                            name="decrementer"
                            onClick={e =>
                              this.incrementer(row.id, row.quantity, e)
                            }
                          >
                            -
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Paper>
          )}

          <button type="submit" onClick={this.toggleHidden.bind(this)}>
            Checkout
          </button>
          {!this.state.isHidden && (
            <CheckoutForm
              cart={this.props.cart}
              cartItems={this.props.cartItems}
            />
          )}

          <br />
          <span>
            <small>Your Total:</small>
            <h2>{this.state.price}</h2>
            <button type="button" onClick={this.handleCheckout}>
              Checkout
            </button>
          </span>
        </div>
      </Fragment>
    )
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCartThunk()),
    increment: incrementItemInfo =>
      dispatch(incrementCartItemThunk(incrementItemInfo)),
    deleteItem: deleteItemInfo => dispatch(deleteCartItemThunk(deleteItemInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Cart)
)
