import axios from 'axios'

//ACTION TYPES

const GET_ORDERS = 'GET_ORDERS'

//ACTION CREATORS

const setNewOrderArray = ordersArray => ({
  type: GET_ORDERS,
  ordersArray
})

// THUNK CREATORS

export const fetchSingleUserOrdersThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`api/orders/user/${id}`)
      dispatch(setNewOrderArray(data))
    } catch (err) {
      console.log(err)
    }
  }
}

// INITIAL STATE
const initialState = []

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.ordersArray
    default:
      return state
  }
}
