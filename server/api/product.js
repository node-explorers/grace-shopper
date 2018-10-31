const express = require('express')
const router = express.Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    let producs = await Product.findAll()
    res.json(producs)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try{
    let productId = req.params.productId
    let product = await Product.findById(productId)
    res.json(product)
  }catch(err){
    next(err)
  }
})





module.exports = router;
