import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import {AllProduct} from './AllProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

const dummy_products=[
  {
    name:"Camping Shoes",
    category:"Camping",
    imageUrl:'image.png',
    description:'Really nice shoes '

  },

]

describe('AllProduct', () => {
  let product

  beforeEach(() => {
    product = shallow(<AllProduct products={dummy_products}/>)
  })

  it('renders the image correctly', () => {
    console.log(product.find('CardTitle'))
    expect(product.find('CardTitle').length).to.be.equal(1)
  })
})
