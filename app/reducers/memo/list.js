import {
  RECIEVE_MEMOLIST,
  DROP_MEMOLIST,
} from '../../actions/memo'



export default (state = {
  items: [],
}, action) => {
  switch (action.type) {
    case RECIEVE_MEMOLIST:
      return Object.assign({}, state, {
        items: action.items,
      })
    case DROP_MEMOLIST:
      return Object.assign({}, state, {
        items: [],
      })
    default:
      return state
  }
}
