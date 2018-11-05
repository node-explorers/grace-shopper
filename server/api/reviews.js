const express = require('express')
const router = express.Router()

const { Review } = require('../db/models')
const { User } = require('../db/models')

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
      },
      include: [User]
    })
    console.log(productReviews)
    res.json(productReviews)
  } catch (err) {
    next(err)
  }
})

// create a new review
router.post('/', async (req, res, next) => {
  try {
    const noAssoc = await Review.create(req.body, { returning: true })
    const newReview = await Review.findById(noAssoc.id, {
      include: [User]
    })
    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

module.exports = router
