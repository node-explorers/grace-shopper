const express = require('express')
const router = express.Router()
const { Cart } = require('../db/models/cart')

//fetch all the items from the cart
router.get('/', async (req, res, next) => {
  try {
    // const
  } catch (err) {
    next(err)
  }
})

module.exports = router
