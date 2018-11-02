import axios from 'axios'

//ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const GET_PRODUCT_BY_SEARCH = 'GET_PRODUCT_BY_SEARCH'

//ACTION CREATORS

const getProductsFromServer = products => ({
  type: GET_PRODUCTS,
  products
})

const getSingleProductsFromServer = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const getProductBySearch = search => ({
  type: GET_PRODUCT_BY_SEARCH,
  search
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
  singleProduct: {}
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product }
    case GET_PRODUCT_BY_SEARCH:
      return action.search
    default:
      return state
  }
}
