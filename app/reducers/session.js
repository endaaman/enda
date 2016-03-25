import {
  CREATE_SESSION,
  DELETE_SESSION
} from '../actions/session'



export default (state = {
  user: null,
  token: '',
}, action) => {
  switch (action.type) {
    case CREATE_SESSION:
      return Object.assign({}, state, {
        user: action.user,
        token: action.token,
      })
    case DELETE_SESSION:
      return Object.assign({}, state, {
        user: null,
        token: '',
      })
    default:
      return state
  }
}
