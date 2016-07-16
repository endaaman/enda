import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

import NotFound from '../components/not_found'

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="404"
          meta={[
            { name: 'page-status', content: '404' },
          ]}
        />
        <NotFound />
      </div>
    )
  }
}

export default NoMatch
