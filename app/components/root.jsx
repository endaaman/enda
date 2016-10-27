import React, {Component} from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import urijs from 'urijs'

import Header from './header'
import Footer from './footer'
import Loader from './loader'
import Toast from './toast'

import { getGoogleFontsHref } from '../utils'
import uri from '../lib/uri'
import { check } from '../actions/session'

import styles from '../styles/root.css'
import icon from '../assets/endaaman.png'


const fonts = {
  'Ubuntu': true,
  'Ubuntu Mono': true
}

class Root extends Component {
  componentWillMount() {
    this.props.dispatch(check())
  }
  render() {
    const u = uri()
    const iconUrl = urijs(icon).protocol(u.protocol()).hostname(u.hostname()).toString()
    const desc = '@endaaman\'s website'
    return (
      <div className={styles.root}>
        <Helmet
          titleTemplate="%s | えんだーまんの家"
          link={[
            {'rel': 'shortcut icon', 'href': require('../assets/favicon.ico')},
            {'rel': 'stylesheet', 'href': getGoogleFontsHref(fonts)},
          ]}
          meta={[
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1' },
            { name: 'theme-color', content: '#7FB685' },
            { name: 'twitter:site', content: '@endaaman' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: iconUrl },
            { property: 'og:image', content: iconUrl },
            { name: 'twitter:title', content: 'えんだーまんの家' },
            { name: 'description', content: desc },
            { name: 'twitter:description', content: desc },
            { property: 'og:description', content: desc },
          ]}
        />
        <Header />
        {this.props.children}
        <Footer />
        <Loader />
        <Toast />
      </div>
    )
  }
}

export default connect()(Root)
