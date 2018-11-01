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

export const incrementCartItemThunk = incrementInfo => {
  return async dispatch => {
    try {
      const { id } = incrementInfo
      const { data } = await axios.put(`/api/cartItems/${id}`, incrementInfo)

      const dispatchAction = incrementer(data)
      dispatch(dispatchAction)
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteCartItemThunk = cartItemDeleteInfo => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cartItems/${cartItemDeleteInfo}`)

      const deleteAction = deleteItem(cartItemDeleteInfo)
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
    case INCREMENT:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.id !== action.item.id) {
            return item
          } else return action.item
        })
      }
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
