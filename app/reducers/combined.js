import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import memoDetailReducer from './memo/detail'
import memoListReducer from './memo/list'
import sessionReducer from './session'
import loaderReducer from './loader'
import toastReducer from './toast'


export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  loader: loaderReducer,
  toast: toastReducer,
  memo: combineReducers({
    detail: memoDetailReducer,
    list: memoListReducer,
  }),
  session: sessionReducer,
})
