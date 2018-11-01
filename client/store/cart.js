import axios from 'axios'

//SELECTORS       ----------==============>>>>>>>>>>>>>>>>>>>

//ACTION_TYPES    ----------==============>>>>>>>>>>>>>>>>>>>

const GET_CART = 'GET_CART'
const INCREMENT = 'INCREMENT'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'

//ACTION_CREATORS ----------==============>>>>>>>>>>>>>>>>>>>
const getAllCartItems = items => ({
  type: GET_CART,
  items
})

const incrementer = item => ({
  type: INCREMENT,
  item
})

const deleteItem = id => ({
  type: DELETE_ITEM,
  id
})

const addItem = item => ({
  type: ADD_ITEM,
  item
})

//THUNKS          ----------==============>>>>>>>>>>>>>>>>>>>
export const fetchCartThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/cart')
      const cartAction = getAllCartItems(data)
      dispatch(cartAction)
    } catch (err) {
      console.log(err)
    }
  }
}

//NOT HOOKED UP TO BACKEND ROUTE YET
export const deleteCartItemThunk = id => {
  return async dispatch => {
    try {
      await axios.delete('/api/cartItems', id)
      const deleteAction = deleteItem(id)
      dispatch(deleteAction)
    } catch (err) {
      console.error(err)
    }
  }
}

export const addCartItemThunk = cartItemInfo => {
  return async dispatch => {
    try {
      const { data } = await axios.post('api/cartItems', cartItemInfo)
      const addAction = addItem(data)
      console.log(addAction)
      dispatch(addAction)
    } catch (err) {
      console.err(err)
    }
  }
}

//INITIAL STATE   ----------==============>>>>>>>>>>>>>>>>>>>
const initialState = []
//REDUCER         ----------==============>>>>>>>>>>>>>>>>>>>

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.items
    case DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.id)
      }
    case ADD_ITEM:
      return { ...state, cartItems: state.cartItems.concat(action.item) }
    default:
      return state
  }
}
