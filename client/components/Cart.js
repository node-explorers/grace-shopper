import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import CheckoutForm from './CheckoutForm';

import {
  fetchCartThunk,
  deleteCartItemThunk,
  incrementCartItemThunk
} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  incrementer = (id, currQuant, event) => {
    if (currQuant === 0 && event.target.name === 'decrementer') return
    const dispatchObject = {
      id,
      style: event.target.name
    }

    this.props.increment(dispatchObject)
    // dispatch decrement
  }

  handleCheckout = evt => {
    //do this on checkout
  }

  handleRemove = productId => {
    //remove item from cart

    this.props.deleteItem(productId)
  }

  render() {
    return (
      <Fragment>
        <h2>Your Cart!</h2>
        <div>
          {!this.props.cart.cartItems ? (
            <p>No Items</p>
          ) : (
            <div>
              {this.props.cart.cartItems.map(item => {
                return (
                  <div key={item.id}>
                    <h1>{item.product.name}</h1>
                    <small>{item.price}</small>
                    <img src={item.product.imageUrl} />
                    <h4>Quantity: {item.quantity}</h4>
                    <span>
                      {/* change quantity */}
                      <button
                        type="button"
                        name="incrementer"
                        onClick={e =>
                          this.incrementer(item.id, item.quantity, e)
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        name="decrementer"
                        onClick={e =>
                          this.incrementer(item.id, item.quantity, e)
                        }
                      >
                        -
                      </button>
                    </span>

                    {/* remove items  */}
                    <button
                      type="button"
                      onClick={() => this.handleRemove(item.id)}
                    >
                      Remove from cart
                    </button>
                  </div>
                )
              })}
            </div>
          )}


          <button
              type="button"
              onClick={() => <CheckoutForm/> }>
            Checkout
          </button>



        </div>
      </Fragment>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
