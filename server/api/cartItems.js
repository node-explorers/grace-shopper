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

router.put('/:itemId', async (req, res, next) => {
  try {
    const { style } = req.body

    const currItem = await CartItem.findOne({
      where: {
        id: req.params.itemId
      }
    })
    if (style === 'decrementer') {
      await currItem.decrement('quantity')
    } else {
      await currItem.increment('quantity')
    }
    res.json(currItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: {
        id: req.params.itemId
      }
    })
    res.status(202)
    res.send('cart entry removed')
  } catch (err) {
    next(err)
  }
})
module.exports = router
