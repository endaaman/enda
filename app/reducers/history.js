import {
  ADD_HISTORY,
} from '../actions/history'



export default (state = {
  last: null
}, action) => {
  switch (action.type) {
    case ADD_HISTORY:
      return Object.assign({}, state, {
        last: action.href
      })
    default:
      return state
  }
}
