import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'
import { fetchCartThunk } from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  incrementer = evt => {
    if (evt.target.name === 'incrementer') {
      //dispatch increment
    } else {
    } // dispatch decrement
  }

  handleCheckout = evt => {
    //do this on checkout
  }

  handleRemove = evt => {
    //remove item from cart
  }

  render() {
    return (
      <Fragment>
        <h2>Your Cart!</h2>
        <div>
          {!this.props.cart.length ? (
            <p>No Items</p>
          ) : (
            <div>
              {this.props.cart.map(item => {
                return (
                  <div key={item.id}>
                    <h1>{item.name}</h1>
                    <small>{item.price}</small>
                    <img src={item.imageUrl} />
                    <h4>Quantity: {item.quantity}</h4>
                    <span>
                      {/* change quantity */}
                      <button
                        type="button"
                        name="incrementer"
                        onClick={this.incrementer}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        name="decrementer"
                        onClick={this.incrementer}
                      >
                        -
                      </button>
                    </span>

                    {/* remove items  */}
                    <button type="button" onClick={this.handleRemove}>
                      Remove from cart
                    </button>
                  </div>
                )
              })}
            </div>
          )}
          <button type="button" onClick={this.handleCheckout}>
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
    increment: () => dispatch(incrementThunk)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
