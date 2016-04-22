import React, {Component} from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import Root from './components/root'

import Home from './pages/home'
import MemoShow from './pages/memo/show'
import MemoEdit from './pages/memo/edit'
import MemoNew from './pages/memo/new'
import _File from './pages/file'
import Login from './pages/login'
import Logout from './pages/logout'
import NoMatch from './pages/no_match'



export default (
  <Route path='/' component={Root} >
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />
    <Route path='logout' component={Logout} />
    <Redirect from='memo' to='/' />
    <Route path='memo/new' component={MemoNew} />
    <Route path='memo/:path' component={MemoShow} />
    <Route path='memo/:path/edit' component={MemoEdit} />
    <Route path='file' component={_File} />
    <Route path='*' name='404' component={NoMatch} />
  </Route>
)
