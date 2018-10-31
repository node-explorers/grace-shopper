const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {notEmpty: true}
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {isIn: [['snowsports', 'hiking', 'camping']]}
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'pictures/products/default.png'
  },
  keyWords: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: true
    }
  }
})

Product.findByCategory = category => Product.findAll({where: {category}})

Product.findByName = name => Product.findAll(
  {where: {name}})

module.exports = Product
