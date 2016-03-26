import {
  RECIEVE_MEMO,
} from '../../actions/memo'



export default (state = {
  items: [],
}, action) => {
  switch (action.type) {
    case RECIEVE_MEMO:
      return Object.assign({}, state, {
        items: [...state.items, action.item]
      })
    default:
      return state
  }
}
