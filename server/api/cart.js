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
      console.log(newCart)
      res.json(newCart)
    } else {
      const existingCart = await Cart.findOrCreate({
        where: {
          userId: req.session.passport.user
        }
      })
    }

    let obj = {
      // session: req.session.passport.user,
      id: req.session.id
    }
    // res.send(obj)
  } catch (err) {
    next(err)
  }
})

module.exports = router
