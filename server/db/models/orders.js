const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  productList: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {isIn: [['shipped', 'delivered', 'received']]}
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {isEmail: true}
  }
})

module.exports = Orders
