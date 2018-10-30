import axios from 'axios'

//ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'

//ACTION CREATORS

const getProductsFromServer = products => ({
  type: GET_PRODUCTS,
  products
})

//THUNK CREATORS

export const fetchProducts = () => {
  return async dispatch => {
    try{
     const {data} = await axios.get('/api/products');
     dispatch(getProductsFromServer(data))
    }catch(err){
      console.log(err)
    }
  }
}

//REDUCER

export default function(state = [], action){
  switch(action.type){
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
