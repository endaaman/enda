import React, { Component } from 'react'
import Helmet from 'react-helmet'

import Root from '../components/root'
import Container from '../components/container'
import Header from '../components/header'
import Footer from '../components/footer'
import { connect } from 'react-redux'

import { logout } from '../actions/session'

class Logout extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  logout() {
    this.props.dispatch(logout())
    this.context.router.push('/')
  }
  render() {
    return (
      <Root>
        <Helmet
          title="Logout"
          meta={[
            { name: 'robots', content: 'nofollow, noindex' },
          ]}
        />
        <Header />
        <Container>
          <h1>Logout</h1>
          { !this.props.active
              ? <p>You are not logged in</p>
              : null
          }
          <button disabled={!this.props.active} onClick={this.logout.bind(this)}>Logout</button>
        </Container>
        <Footer />
      </Root>
    )
  }
}

export default connect((state)=>({
  active: !!state.session.user
}))(Logout)
