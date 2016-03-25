import React, { Component } from 'react'
import Helmet from 'react-helmet'

import Root from '../components/root'
import Container from '../components/container'
import Header from '../components/header'
import Footer from '../components/footer'
import { connect } from 'react-redux'

import { logout } from '../actions/session'

class Logout extends Component {
  logout() {
    this.props.dispatch(logout())
  }
  render() {
    return (
      <Root>
        <Helmet
          title="Logout"
        />
        <Header />
        <div>
          <h1>Logout</h1>
          <button onClick={this.logout.bind(this)}>Logout</button>
        </div>
        <Footer />
      </Root>
    )
  }
}

export default connect()(Logout)
