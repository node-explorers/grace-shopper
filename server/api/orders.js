const express = require('express')
const router = express.Router()
const User = require('../db/models/user')

const Order = require('../db/models/orders')
const OrderItem = require('../db/models/orderItems')

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
  const test = await Order.create(req.body)
  res.json(test)
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      res.json(order)
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
router.get('/:userId', async (req, res, next) => {
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
