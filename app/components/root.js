import React, {Component} from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Loader from './loader'
import Header from './header'
import Footer from './footer'

import { getGoogleFontsHref } from '../util'
import { check } from '../actions/session'
import { addHistory } from '../actions/history'

import styles from '../styles/root.css'
import icon from '../assets/endaaman.png'


const fonts = {
  'Ubuntu': true,
  'Ubuntu Mono': true
}

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBackButton: false
    }
  }
  componentDidMount() {
    this.props.dispatch(check())
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.location.pathname)
    addHistory(this.props.location.pathname)
    // var routeChanged = nextProps.location !== this.props.location
    // console.log(routeChanged)
    // this.setState({ showBackButton: routeChanged })
  }

  render() {
    const desc = '@endaaman\'s website'
    const metas = [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@endaaman' },
      { name: 'twitter:image', content: icon },
      { property: 'og:image', content: icon },

      { name: 'description', content: desc },
      { name: 'twitter:description', content: desc },
      { property: 'og:description', content: desc },
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
        <Header />
        {this.props.children}
        <Footer />
        <Loader />
      </div>
    )
  }
}

export default connect((state)=>({
  prevHref: state.history.last
}))(Root)
