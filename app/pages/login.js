import React, { Component } from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Container from '../components/container'

import LoginForm from '../forms/login'
import { login } from '../actions/session'


class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit(data) {
    this.props.dispatch(login(data)).then(()=> {
      this.context.router.push('/')
    })
  }
  render() {
    return (
      <article>
        <Container>
          <h1>Login</h1>
          <p>※俺用</p>
          { this.props.active
              ? (
                <p>You are already logged in.
                  Please <Link to="/logout">Logout</Link>.</p>
              )
              : null
          }
          <LoginForm disabled={this.props.active} onSubmit={this.onSubmit.bind(this)}/>
        </Container>
      </article>
    )
  }
}


export default connect((state, ownProps) =>({
  active: !!state.session.user,
  router: ownProps
}))(Login)
