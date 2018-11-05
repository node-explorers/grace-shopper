const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = './orderItem'

const Order = db.define(
  'order',
  {
    totalPrice: {
      type: Sequelize.DECIMAL,
      validate: {
        min: 0.0
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'processing',
      validate: { isIn: [['shipped', 'delivered', 'processing']] }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      validate: { isEmail: true }
    }
  }
  // {
  //   defaultScope: {
  //     include: [{ model: OrderItem }]
  //   }
  // }
)

Order.convertCartToOrder = async cart => {
  try {
    let userId
    if (cart.userId) {
      userId = cart.userId
    } else {
      userId = cart.sessionId
    }

    const order = await Order.create({
      totalPrice: cart.totalPrice,
      userId
    })
    return order.id
  } catch (error) {
    console.error(error)
  }
}

module.exports = Order
