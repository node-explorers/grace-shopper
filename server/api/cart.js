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
      const findExistingCart = await Cart.findAll({
        where: {
          sessionId: req.session.id
        }
      })
      console.log(findExistingCart[0])
      await findExistingCart[0].update({
        userId: req.session.passport.user
        //sessionId: null
      })
      res.json(findExistingCart[0])
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
