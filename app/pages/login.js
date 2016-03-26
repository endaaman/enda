import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Root from '../components/root'
import Container from '../components/container'
import Header from '../components/header'
import Footer from '../components/footer'

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
      <Root>
        <Helmet
          title="Login"
          meta={[
            { name: 'robots', content: 'nofollow, noindex' },
          ]}
        />
        <Header />
        <Container>
          <h1>Login</h1>
          { this.props.active
              ? <p>You are already logged in</p>
              : null
          }
          <LoginForm disabled={this.props.active} onSubmit={this.onSubmit.bind(this)}/>
        </Container>
        <Footer />
      </Root>
    )
  }
}


export default connect(state =>({
  active: !!state.session.user
}))(Login)
