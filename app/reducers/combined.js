import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import memoReducer from './memo'
import sessionReducer from './session'

export default combineReducers({
  memo: memoReducer,
  form: formReducer,
  session: sessionReducer,
  routing: routerReducer,
})

// export default memosReducer
