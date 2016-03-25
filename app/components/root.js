import React, {Component} from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import { getGoogleFontsHref } from '../util'
import { check } from '../actions/session'

import styles from '../styles/root.css'
import icon from '../assets/endaaman.png'


const fonts = {
  'Ubuntu': true
}

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(check())
  }
  render() {
    const metas = [
      {name: 'viewport', content: 'width=device-width,initial-scale=1'},
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:site', content: '@endaaman'},
      {name: 'twitter:image', content: icon},
      {property: 'og:image', content: icon},
    ]

    return (
      <div className={styles.root}>
        <Helmet
          titleTemplate="%s | えんだーまんの家"
          link={[
            {'rel': 'stylesheet', 'href': getGoogleFontsHref(fonts)},
          ]}
          meta={metas}
        />
        {this.props.children}
      </div>
    )
  }
}

export default connect()(Root)
