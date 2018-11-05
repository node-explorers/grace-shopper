const express = require('express')
const router = express.Router()
module.exports = router

const { Order, OrderItem, Cart, CartItem } = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    console.log('*****Req******', req.body)
    const cart = await Cart.findOne({ where: { sessionId: '1' } })
    const cartItemArray = await CartItem.findAll({ where: { cartId: 1 } })

    // console.log('****CART*******', cart)
    // console.log('*****cartItem*****', cartItemArray)

    const order = await Order.convertCartToOrder(cart)
    await OrderItem.convertCartToOrder(order, cartItemArray)
    const newOrder = await Order.findOne({ where: { id: order } })
    // const orderItems = await OrderItem.findAll({ where: { orderId: 1 } })
    // console.log('*****newOrder*****', newOrder)
    // console.log('***order items***', orderItems)

    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
