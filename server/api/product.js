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

router.get('/:productname', async (req, res, next) => {
  try{
    let productName = req.body.productName
    let product = await Product.findOne({
      where: {
        name: productName
      }
    })
    res.json(product)
  }catch(err){
    next(err)
  }
})

module.exports = router;
