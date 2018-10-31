import axios from 'axios'

//ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//ACTION CREATORS

const getProductsFromServer = products => ({
  type: GET_PRODUCTS,
  products
})

const getSingleProductsFromServer = product => ({
  type: GET_SINGLE_PRODUCT,
  product
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

const initialState = {
  products: [],
  singleProduct: {}
}



//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
