const express = require('express')
const router = express.Router()

const { Review } = require('../db/models')

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userReviews = await Review.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userReviews)
  } catch (err) {
    next(err)
  }
})

router.get('/product/:productId', async (req, res, next) => {
  try {
    const productReviews = await Review.findAll({
      where: {
        productId: req.params.productId
      }
    })
    console.log(productReviews)
    res.json(productReviews)
  } catch (err) {
    next(err)
  }
})

module.exports = router
