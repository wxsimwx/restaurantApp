import * as actions from '../actions/types'

export default function restaurantReducer(state = [], action) {
  switch (action.type) {
    case actions.GET_LOCATION:
      return [
        ...state, 
        action.payload
      ]
    default:
      return state;
  }
}
