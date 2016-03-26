import React, {Component} from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Home from './pages/home'
import MemoShow from './pages/memo/show'
import MemoEdit from './pages/memo/edit'
import Login from './pages/login'
import Logout from './pages/logout'
import NoMatch from './pages/404'



export default (
  <Route path='/'>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />
    <Route path='logout' component={Logout} />
    <Route path='memos/:title' component={MemoShow} />
    <Route path='memos/:title/edit' component={MemoEdit} />
    <Route path='*' name='404' component={NoMatch} />
  </Route>
)
