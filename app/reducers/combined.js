import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import sessionReducer from './session'
import tokenReducer from './token'
import loaderReducer from './loader'
import toastReducer from './toast'
import fileReducer from './file'
import memoDetailReducer from './memo/detail'
import memoListReducer from './memo/list'


export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  token: tokenReducer,
  session: sessionReducer,
  loader: loaderReducer,
  toast: toastReducer,
  files: fileReducer,
  memo: combineReducers({
    detail: memoDetailReducer,
    list: memoListReducer,
  }),
})
