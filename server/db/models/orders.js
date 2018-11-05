const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderItems')
const User = require('./user')

const Orders = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL,
    defaultValue: 0.0,
    validate: {
      min: 0.0
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isIn: [['shipped', 'delivered', 'received']] }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true }
  }
})

module.exports = Orders
