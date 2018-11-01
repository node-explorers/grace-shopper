const express = require('express')
const router = express.Router()
const { Product } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    let id = req.params.productId
    let product = await Product.findOne({ where: { id } })
    console.log(product)
    res.json(product)
  } catch (err) {
    next(err)
  }
})


router.get('/category/:name', async (req, res, next) => {
  try{
    let products = await Product.findAll({
      where: {
        category: req.params.name
      }
    })
    res.json(products)
  }catch(err){
    next(err)
  }
})


module.exports = router;

