import {
  RECIEVE_MEMOLIST,
  DROP_MEMOLIST,
  ADD_MEMO,
  SET_MEMO,
  DELETE_MEMO,
} from '../actions/memo'



export default (state = {
  items: [],
}, action) => {
  switch (action.type) {
    case RECIEVE_MEMOLIST:
      return {...state, ...{
        items: action.items,
      }}
    caconsole.log('drop')
      return {...state, ...{
        items: [],
      }}
    case ADD_MEMO:
      return {...state, ...{
        items: [...state.items, action.item]
      }}
    case SET_MEMO:
      return {...state, ...{
        items: state.items.map((memo)=> {
          if (memo._id === action.item._id) {
            return action.item
          }
          return {...memo}
        })
      }}
    case DELETE_MEMO:
      return {...state, ...{
        items: state.items.filter((memo)=> memo._id !== action.id )
      }}
    default:
      return state
  }
}
