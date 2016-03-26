import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHistory } from 'history'
import promiseMiddleware from 'redux-promise'
import combinedReducer from '../reducers/combined'

import { isOnServer } from '../util'
import routes from '../routes'

export default function(initialState = {}) {
  const store = createStore(
    combinedReducer,
    initialState,
    applyMiddleware(thunk)
  )
  return store
}
