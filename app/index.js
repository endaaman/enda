import './polyfill'
import React, { createElement as $ } from 'react'
import { render } from 'react-dom'
import { Router, match } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import withScroll from 'scroll-behavior'
import cookies from 'browser-cookies'

import routes from './routes'
import configureStore from './store/configure'
import reducer from './reducers/combined'

import { setToken } from './actions/token'
import { configureHttp } from './lib/http'

import './styles/global.css'

const rootDom = document.getElementById('app')
const initialState = window.__initial_state__ || {}
const store = configureStore(initialState)
const history = syncHistoryWithStore(withScroll(createBrowserHistory()), store)


configureHttp(store.getState)
const token = cookies.get('token')
if (token) {
  store.dispatch(setToken(token))
}


match({ routes, history }, (error, redirectLocation, renderProps) => {
  render((
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>
  ), rootDom)
})
