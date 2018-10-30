/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    it('requires name', async () => {
      const product = Product.build({
        name: '',
        description: 'boots are for walking',
        category: 'hiking',
        price: 100.5
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('notEmpty on name failed')
      }
    })

    it('requires category', async () => {
      const product = Product.build({
        name: 'boots',
        description: 'boots are for walking',
        category: '',
        price: 100.53
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed if price was null'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
  })
})
