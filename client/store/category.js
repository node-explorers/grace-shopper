import axios from 'axios'

//Action Types

const GET_CATEGORY = 'GET_CATEGORY';


//Action creators

const getCategoryFromServer = category => ({
  type: GET_CATEGORY,
  category
})

//Thunk Creator

export const getCategoryItems = categoryName => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/category/${categoryName}`)
      dispatch(getCategoryFromServer(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.category
    default:
      return state
  }
}

