const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/products', require('./product'))
router.use('/cart', require('./cart'))
router.use('/cartItems', require('./cartItems'))
router.use('/orders', require('./order'))
router.use('/orderItems', require('./orderItems'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
