const express = require('express')
const router = express.Router()

const { User, Order, OrderItem, Cart, CartItem } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [User, OrderItem] })
    if (orders) {
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      const cart = await Cart.findOne({
        where: {
          sessionId: req.session.id
        }
      })

      const cartItemArray = await CartItem.findAll({
        where: { cartId: cart.id }
      })

      const orderId = await Order.convertCartToOrder(cart, req.body)
      await OrderItem.convertCartItemsToOrderItems(orderId, cartItemArray)
      const newOrder = await Order.findOne({ where: { id: orderId } })

      res.json(newOrder)
    } else {
      const cart = await Cart.findOne({
        where: { userId: req.session.passport.user }
      })
      const cartItemArray = await CartItem.findAll({
        where: { cartId: cart.id }
      })
      const orderId = await Order.convertCartToOrder(cart, req.body)
      await OrderItem.convertCartItemsToOrderItems(orderId, cartItemArray)
      const newOrder = await Order.findOne({ where: { id: orderId } })

      res.json(newOrder)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        id: req.params.id
      },
      include: [User, OrderItem]
    })
    if (order) {
      res.json(order[0])
    }
  } catch (err) {
    next(err)
  }
})

router.get('/search/:status', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [User, OrderItem],
      where: {
        status: req.params.status
      }
    })
    if (orders) {
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const orderToUpdate = await Order.findById(req.params.id)
  if (orderToUpdate) {
    await orderToUpdate.update(req.body)
    res.send(orderToUpdate)
  }
})

//Route for serving single user order history
router.get('/user/:userId', async (req, res, next) => {
  try {
    const orderArr = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(orderArr)
  } catch (err) {
    next(err)
  }
})

module.exports = router
