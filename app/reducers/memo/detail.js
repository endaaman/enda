import {
  RECIEVE_MEMO,
  FAIL_TO_FETCH_MEMO,
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
    default:
      return state
  }
}
