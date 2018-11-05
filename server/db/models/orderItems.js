const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderItem = db.define(
  'orderItem',
  {
    quantity: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      }
    },
    price: {
      type: Sequelize.DECIMAL,
      validate: {
        min: 0.0
      }
    }
  },
  {
    defaultScope: {
      include: [{ model: Product }]
    }
  }
)

OrderItem.convertCartToOrder = async (orderId, cartItemArray) => {
  try {
    await Promise.all(
      cartItemArray.map(cartItem => {
        OrderItem.create({
          quantity: cartItem.quantity,
          price: cartItem.price,
          productId: cartItem.productId,
          orderId
        })
      })
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = OrderItem
