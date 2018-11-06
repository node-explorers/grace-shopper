import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const TOGGLE_ADMIN = 'TOGGLE_ADMIN'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const toggleAdmin = () => ({ type: TOGGLE_ADMIN })
const userDelete = userId => ({ type: DELETE_USER, userId })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const isAdmin = (userId, toggAdmin) => async dispatch => {
  try {
    await axios.put(`/api/users/${userId}`, { toggAdmin })
    //  history.push('/userManagement')
  } catch (err) {
    console.error(err)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/`, { params: { id: userId } })
    dispatch(userDelete(userId))
  } catch (err) {
    console.error(err)
  }
}

export const passwordReset = (userId, bool) => async dispatch => {
  try {
    await axios.put(`/api/users/reset/${userId}`, { bool })
    // history.push('/userManagement')
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case TOGGLE_ADMIN:
      return state
    case DELETE_USER:
      return state
    default:
      return state
  }
}
