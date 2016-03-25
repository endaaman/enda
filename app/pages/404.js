import React, { Component } from 'react'
import Helmet from 'react-helmet'

import Root from '../components/root'
import Container from '../components/container'
import Header from '../components/header'
import Footer from '../components/footer'

class NoMatch extends Component {
  render() {
    return (
      <Root>
        <Helmet
          title="404"
        />
        <Header />
        <div>
          <h1>404</h1>
        </div>
        <Footer />
      </Root>
    )
  }
}

export default NoMatch
