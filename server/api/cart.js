const express = require('express')
const router = express.Router()

const Cart = require('../db/models/cart')

//fetch all the items from the cart

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      const newCart = await Cart.findOrCreate({
        where: {
          sessionId: req.session.id
        }
      })
      res.json(newCart[0])
    } else {
      const existingCart = await Cart.findOrCreate({
        where: {
          userId: req.session.passport.user
        }
      })
      res.json(existingCart[0])
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
