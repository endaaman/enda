import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import sessionReducer from './session'
import tokenReducer from './token'
import loaderReducer from './loader'
import toastReducer from './toast'
import fileReducer from './file'
import memoReducer from './memo'


export default combineReducers({
  form: formReducer,

  token: tokenReducer,
  session: sessionReducer,
  loader: loaderReducer,
  toast: toastReducer,
  files: fileReducer,
  memo: memoReducer,
})
