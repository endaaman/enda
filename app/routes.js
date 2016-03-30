import React, {Component} from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import Root from './components/root'

import Home from './pages/home'
import MemoShow from './pages/memo/show'
import MemoEdit from './pages/memo/edit'
import Login from './pages/login'
import Logout from './pages/logout'
import NoMatch from './pages/no_match'



export default (
  <Route path='/' component={Root} >
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />
    <Route path='logout' component={Logout} />
    <Redirect from='memos' to='/' />
    <Route path='memos/:path' component={MemoShow} />
    <Route path='memos/:path/edit' component={MemoEdit} />
    <Route path='*' name='404' component={NoMatch} />
  </Route>
)
