
const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  productList: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
})

module.exports = Cart;
