import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import memoReducer from './memo'
import sessionReducer from './session'
import loaderReducer from './loader'
import historyReducer from './history'


export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  loader: loaderReducer,
  memo: memoReducer,
  session: sessionReducer,
  history: historyReducer
})

// export default memosReducer
