import React, {Component} from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Home from './pages/home'
import Memo from './pages/memo'
import Login from './pages/login'
import Logout from './pages/logout'
import NoMatch from './pages/404'



export default (
  <Route path='/'>
    <IndexRoute name='home' component={Home} />
    <Route path='login' component={Login} />
    <Route path='logout' component={Logout} />
    <Route path='memos/:title' name='memo' component={Memo} />
    <Route path='*' name='404' component={NoMatch} />
  </Route>
)
