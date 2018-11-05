import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const GET_O_BY_STATUS = 'GET_O_BY_STATUS'
const SET_ORDER = 'SET_ORDER'

const getOrder = orders => ({
  type: GET_ORDER,
  orders
})

const getByStatus = orders => ({
  type: GET_O_BY_STATUS,
  orders
})

const updateOrder = order => ({
  type: UPDATE_ORDER,
  order
})

const getSingleOrder = order => ({
  type: GET_SINGLE_ORDER,
  order
})

const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const thunkOrders = () => {
  return async dispatch => {
    const orders = (await axios.get('/api/orders')).data
    console.log('THunkk  ', orders)
    dispatch(getOrder(orders))
  }
}
export const thunkOrder = id => {
  return async dispatch => {
    const order = (await axios.get(`/api/orders/${id}`)).data
    console.log('In ONe Order Thunk c ', order)
    dispatch(getSingleOrder(order))
  }
}

export const update = order => {
  return async dispatch => {
    const orderToUpdate = (await axios.put(`/api/orders/${order.id}`, order))
      .data
    dispatch(updateOrder(orderToUpdate))
  }
}

export const thunkSearch = status => {
  return async dispatch => {
    const orders = (await axios.get(`/api/orders/search/${status}`)).data
    dispatch(getByStatus(orders))
  }
}

export const createOrder = cartInfo => async dispatch => {
  try {
    const order = (await axios.post(`/api/orders`, cartInfo)).data
    dispatch(setOrder(order))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  orders: [],
  singleOrder: {},
  ordersByStatus: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_O_BY_STATUS:
      return { ...state, ordersByStatus: action.orders }
    case UPDATE_ORDER:
      const newO = state.orders.filter(ord => ord.id !== action.order.id)
      return { ...state, orders: [...newO, action.order] }
    case GET_ORDER:
      return { ...state, orders: action.orders }
    case GET_SINGLE_ORDER:
      return { ...state, singleOrder: action.order }
    case SET_ORDER:
      return { ...state, orders: [...state.orders, action.order] }

    default:
      return state
  }
}
