// /* global describe beforeEach it */

// const { expect } = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const User = db.model('user')
// const Cart = db.model('cart')
// const CartItem = db.model('cartItem')
// const runSeed = require('../../script/seed')

// describe('Order routes', () => {
//   beforeEach(async () => {
//     await runSeed()
//   })

//   describe('/api/orders/', () => {
//     it('Order: POST /api/orders', async () => {
//       const cart = (await Cart.findOne({ where: { sessionId: 'a' } }))
//         .dataValues
//       console.log('****CART****', cart)

//       const res = await request(app)
//         .post('/api/orders', cart)
//         .expect(200)

//       expect(res.body).to.be.an('object')
//       expect(res.body.id).to.be.equal(1)
//     })
//   })
// })
// // end describe('/api/users')
// // end describe('User routes')
