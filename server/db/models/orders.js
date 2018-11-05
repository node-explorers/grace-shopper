const Sequelize = require('sequelize')
const db = require('../db')

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
    defaultValue: 'processing',
    validate: { isIn: [['processing', 'shipped', 'delivered', 'received']] }
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

Orders.convertCartToOrder = async cart => {
  try {
    let userId
    if (cart.userId) {
      userId = cart.userId
    } else {
      userId = cart.sessionId
    }

    const order = await Orders.create({
      totalPrice: cart.totalPrice,
      userId
    })
    return order.id
  } catch (error) {
    console.error(error)
  }
}

module.exports = Orders
