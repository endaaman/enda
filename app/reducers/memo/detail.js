import {
  RECIEVE_MEMO,
  FAIL_TO_FETCH_MEMO,
  ADD_MEMO,
  SET_MEMO,
  DELETE_MEMO,
} from '../../actions/memo'



export default (state = {
  items: [],
  noMatches: []
}, action) => {
  switch (action.type) {
    case RECIEVE_MEMO:
      return Object.assign({}, state, {
        items: [...state.items, action.item]
      })
    case FAIL_TO_FETCH_MEMO:
      return Object.assign({}, state, {
        noMatches: [...state.noMatches, action.noMatched]
      })
    case ADD_MEMO:
      return Object.assign({}, state, {
        items: [...state.items, action.item]
      })
    case SET_MEMO:
      return Object.assign({}, state, {
        items: state.items.map((memo)=> {
          if (memo._id === action.item._id) {
            return action.item
          }
          return memo
        })
      })
    case DELETE_MEMO:
      return Object.assign({}, state, {
        items: state.items.filter((memo)=> memo._id !== action.id )
      })
    default:
      return state
  }
}
