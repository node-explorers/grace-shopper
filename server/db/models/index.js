const User = require('./user')
const Product = require('./product')
const Order = require('./orders')
const Cart = require('./cart')
const Review = require('./review')
const CartItem = require('./cartItems')
const OrderItem = require('./orderItems')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//****** Associations

//Order and User
Order.belongsTo(User)
User.hasMany(Order)

//cart and user
Cart.belongsTo(User)
User.hasMany(Cart)

//CartItem and Cart
CartItem.belongsTo(Cart)
Cart.hasMany(CartItem)

//CartItem and Product
CartItem.belongsTo(Product)

//Order and OrderItem
Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

//OrderItem and Product
OrderItem.belongsTo(Product)

//Product and reviews
Product.hasMany(Review)
Review.belongsTo(Product)

//User and Review
User.hasMany(Review)
Review.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Cart,
  Review,
  OrderItem,
  CartItem
}
