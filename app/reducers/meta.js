import {
  UPDATE_META,
} from '../../actions/meta'



export default (state = {
  desctiption: ''
}, action) => {
  switch (action.type) {
    case UPDATE_META:
      return Object.assign({}, state, {
        desctiption: action.desctiption,
      })
    default:
      return state
  }
}
