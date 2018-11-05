import axios from 'axios'

// Action Types

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

//Action Creator

const getAllReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
})

const addReview = review => ({
  type: ADD_REVIEW,
  review
})

// Thunks

export const fetchAllReviews = type => async dispatch => {
  try {
    const { data } = await axios.get(`/api/reviews/${type.category}/${type.id}`)
    dispatch(getAllReviews(data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewReviewThunk = body => async dispatch => {
  try {
    const { data } = await axios.post('/api/reviews/', body)

    dispatch(addReview(data))
  } catch (err) {
    console.error(err)
  }
}

//Initial State
const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state].concat(action.review)
    default:
      return state
  }
}
