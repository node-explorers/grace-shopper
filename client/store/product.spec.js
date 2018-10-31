import {expect} from 'chai'
import {fetchProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

describe('product thunk creator', () => {
  let store
  let mockAxios

  const middlewares = [thunkMiddleware]
  const mockStore = configureMockStore(middlewares)

  const initialState = {product: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('products', () => {
    it('eventually dispatches the GET_PRODUCTS action', async () => {
      const product = {name: 'skies', price: 200}
      mockAxios.onGet('/api/products').replyOnce(200, product)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(product)
    })
  })
})
