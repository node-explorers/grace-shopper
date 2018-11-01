const express = require('express')
const router = express.Router()
const Product = require('../db/models/product')
const CartItem = require('../db/models/cartItems')

router.post('/', async (req, res, next) => {
  try {
    const itemCreated = await CartItem.create(
      {
        productId: req.body.productId,
        cartId: req.body.cartId,
        price: req.body.price
      },
      {
        returning: true
      }
    )

    const fetchWithAssociationsHack = await CartItem.findById(itemCreated.id)

    res.json(fetchWithAssociationsHack)
  } catch (err) {
    next(err)
  }
})
module.exports = router
