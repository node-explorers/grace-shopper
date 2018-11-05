const express = require('express')
const router = express.Router()

const Cart = require('../db/models/cart')
const CartItems = require('../db/models/cartItems')
const User = require('../db/models/user')

//fetch all the items from the cart

router.delete('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.destroy({
      where: {
        id: req.params.id
      }
    })
    if (cart) {
      res.status(202).send()
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  // const cart = await Cart.findOrCreate({
  //   where: { sessionId: req.session.id }
  try {
    if (!req.session.passport) {
      const newCart = await Cart.findOrCreate({
        where: { sessionId: req.session.id }
      })
      const cart = await Cart.findById(newCart[0].id)
      res.json(cart)
    } else {
      const newCart = await Cart.findOrCreate({
        where: {
          userId: req.session.passport.user
        }
      })

      const cart = await Cart.findById(newCart[0].id)

      // const [updatedCart, [updat]] = await Cart.update(
      //   {
      //     userId: req.session.passport.user
      //   },
      //   {
      //     returning: true,
      //     where: {
      //       sessionId: req.session.id
      //     }
      //   }
      // )
      //console.log(updat)
      res.json(cart)
      /* if (findExistingCart.length !== 0) {
        await findExistingCart[0].update({
          userId: req.session.passport.user,
          sessionId: req.session.id
        })
        res.json(findExistingCart[0])
      } else {
        console.log(findExistingCart)
      } */
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
