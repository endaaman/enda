import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import memoReducer from './memo'
import sessionReducer from './session'
import loaderReducer from './loader'

export default combineReducers({
  loader: loaderReducer,
  memo: memoReducer,
  form: formReducer,
  session: sessionReducer,
  routing: routerReducer,
})

// export default memosReducer
