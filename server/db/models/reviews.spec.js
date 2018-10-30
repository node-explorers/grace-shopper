/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Validations', () => {
    it('requires rating', async () => {
      const review = Review.build({
        rating: 6,
        description: 'boots are for walking'
      })

      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed without `rating`'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation max on rating failed')
      }
    })
  })
})
