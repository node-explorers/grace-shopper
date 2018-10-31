const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
    validate: {
      min: 0.0
    }
  }
})

module.exports = CartItem
