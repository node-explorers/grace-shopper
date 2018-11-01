const Sequelize = require('sequelize')
const db = require('../db')
const CartItem = require('./cartItems')

const Cart = db.define(
  'cart',
  {
    totalPrice: {
      type: Sequelize.DECIMAL,
      defaultValue: 0.0,
      validate: {
        min: 0.0
      }
    },
    sessionId: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    defaultScope: {
      include: [{ model: CartItem }]
    }
  }
)

module.exports = Cart
