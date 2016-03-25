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
  onSubmit(data) {
    this.props.dispatch(login(data))
    .then(()=> {
      console.log('ok')
    }, ()=> {
      console.log('failed')
    })
  }
  render() {
    return (
      <Root>
        <Helmet
          title="Login"
        />
        <Header />
        <div>
          <h1>Login</h1>
          <pre><code>
            {JSON.stringify(this.props.session)}
          </code></pre>
          <LoginForm onSubmit={this.onSubmit.bind(this)}/>
        </div>
        <Footer />
      </Root>
    )
  }
}

export default connect(state =>({
  session: state.session
}))(Login)
