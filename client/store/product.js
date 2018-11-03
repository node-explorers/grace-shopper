import axios from 'axios'
import { runInNewContext } from 'vm'

//ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const GET_PRODUCT_BY_SEARCH = 'GET_PRODUCT_BY_SEARCH'

const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

const DELETE_ITEM = 'DELETE_ITEM'

//ACTION CREATORS

const getProductsFromServer = products => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const getSingleProductsFromServer = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

const getProductBySearch = search => ({
  type: GET_PRODUCT_BY_SEARCH,
  search
})

export const deleteSingleItem = () => ({
  type: DELETE_ITEM
})

//THUNK CREATORS

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/products')

      dispatch(getProductsFromServer(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postingProduct = product => {
  return async dispatch => {
    try {
      const newProduct = (await axios.post('/api/products', product)).data
      dispatch(addProduct(newProduct))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`)
      dispatch(getSingleProductsFromServer(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updatingProduct = product => {
  return async dispatch => {
    console.log('In Thunk update')
    try {
      const newProduct = (await axios.put(
        `/api/products/${product.id}`,
        product
      )).data
      //console.log(' In Thunk new Campus  ', newProduct)
      const action = updateProduct(newProduct)
      //console.log(' In Thunk action ', action)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const searchProduct = keyword => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/search/${keyword}`)
      dispatch(getProductBySearch(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  products: [],
  singleProduct: {},
  searchResults: []
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product }
    case GET_PRODUCT_BY_SEARCH:
      return { searchResults: action.search }
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.product] }
    case UPDATE_PRODUCT:
      const newproduct = state.filter(prd => prd.id !== action.product.id)
      return { ...state, products: [...newproduct, action.product] }
    case DELETE_ITEM:
      return { ...state, singleProduct: {} }

    default:
      return state
  }
}
