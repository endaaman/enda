import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

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
          meta={[
            { name: 'page-status', content: '404' },
          ]}
        />
        <Header />
        <Container>
          <div style={{
            textAlign: 'center'
          }}>
          <h1>404</h1>
          <p>Page not found</p>
          <Link to="/">Back to top</Link>
          </div>
        </Container>
        <Footer />
      </Root>
    )
  }
}

export default NoMatch
