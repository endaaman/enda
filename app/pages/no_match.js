import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

import NotFound from '../components/not_found'

class NoMatch extends Component {
  render() {
    return (
      <article>
        <Helmet
          title="404"
          meta={[
            { name: 'page-status', content: '404' },
          ]}
        />
        <NotFound />
      </article>
    )
  }
}

export default NoMatch
