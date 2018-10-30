'use strict'

// Assertions
const chai = require('chai')
const expect = chai.expect

/* global describe beforeEach it */
const db = require('../server/db')
const Product = db.model('product')
const User = db.model('user')
const seed = require('./seed')

const dummyProducts = [
  {
    category: 'snowsports',
    name: "Jones Women's Solution Splitboard - Women's",
    description: `Directional rocker nose and tail offer excellent float, while camber between your feet delivers supreme edge grip
  Carbon split stringers deliver extra pop and a precise response
  Inner- and outer-edge Traction Tech 2.0 adds edge grip on icy skin tracks and firm descents
  Boltless Bridge split clip platform eliminates base hardware
  Includes Karakoram UltraClip clips that provide tremendous torsional board lock
  Stainless-steel tip and tail reinforcements improve durability
  Compatible with Jones Quick Tension Skin Tail clips (not included)`,
    imageUrl:
      'https://www.rei.com/media/50d7f9ab-0ca8-4b6c-b8c7-2c1ec8e61d03?size=784x588',
    price: 899,
    keyWords: ['snow', 'snowboards', 'Jones']
  }
]
describe('seed script', () => {
  it('seeds the db successfully', async () => {
    try {
      await seed()
      const product = await Product.findById(1)
      expect(product.category).to.equal('snowsports')
    } catch (err) {
      console.error(err)
    }
  })
})
