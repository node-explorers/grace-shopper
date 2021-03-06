const express = require('express')
const router = express.Router()
const { Product } = require('../db/models')
const Sequelize = require('sequelize')
const adminAuth = require('../customMiddleware')

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', adminAuth, async (req, res, next) => {
  try {
    let product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', adminAuth, async (req, res, next) => {
  try {
    const productToUpdate = await Product.findById(req.params.id)
    if (productToUpdate) {
      await productToUpdate.update(req.body)
      res.send(productToUpdate)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    let id = req.params.productId
    let product = await Product.findOne({ where: { id } })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/search/:keyword', async (req, res, next) => {
  try {
    const keyword = req.params.keyword
    const products = await Product.findAll({
      where: {
        [Sequelize.Op.or]: {
          name: {
            [Sequelize.Op.iLike]: `%${keyword}%`
          },
          description: {
            [Sequelize.Op.iLike]: `% ${keyword}%`
          }
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:name', async (req, res, next) => {
  try {
    let products = await Product.findAll({
      where: {
        category: req.params.name
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

module.exports = router
