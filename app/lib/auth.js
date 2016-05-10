import React, { Component } from 'react'
import { connect } from 'react-redux'

import { check } from '../actions/session'

export function requireAuth(Target, Replacer) {
  class AuthComponent extends Component {
    static loadProps({ dispatch }) {
      return dispatch(check())
    }
    componentWillMount() {
      this.constructor.loadProps(this.props)
    }
    componentWillReceiveProps(nextProps) {
      this.constructor.loadProps(nextProps)
    }

    render () {
      const { user, token } = this.props
      return user
        ? <Target {...this.props }/>
        : token
          ? null
          : <Replacer {...this.props }/>
    }
  }

  return connect((state) => ({
    user: state.session.user,
    token: state.token,
  }))(AuthComponent);

}
