const express = require('express')
const router = express.Router()

const { Order } = require('../db/models')
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
