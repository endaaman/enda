import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import marked from 'marked'

import Root from '../components/root'
import Header from '../components/header'
import Container from '../components/container'
import Footer from '../components/footer'

import { getMemo } from '../actions/memo'
import styles from '../styles/memo.css'

class Memo extends Component {
  static loadProps({dispatch, params}) {
    return dispatch(getMemo(params.title))
  }
  getHref() {
    const l = this.props.location
    const search = l.search
      ? '?' + l.search
      : ''
    return `${l.pathname}${search}`
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  dateFormat(date) {
    const _d = new Date(date)
    const y = _d.getFullYear()
    const m = _d.getMonth()
    const d = _d.getDate() + 1
    return `${y}年${m}月${d}日`
  }
  getContentHtml() {
    let html = ''
    if (this.props.memo.content) {
      html = marked(this.props.memo.content)
    }
    return {
      __html: html
    }
  }
  render() {
    return (
      <Root>
        <Helmet
          title={this.props.memo.title}
          meta={[
            { name: 'description', content: this.props.memo.description },
            { name: 'twitter:description', content: this.props.memo.description },
            { property: 'og:description', content: this.props.memo.description },
          ]}
        />
        <Header />
        <article>
          <header className={styles.header}>
            <Container>
              <h1 className={styles.title}>
                <Link to={this.getHref()}>{this.props.memo.title}</Link>
              </h1>
              <div className={styles.date}>
                <span>{this.dateFormat(this.props.memo.created_at)}</span>
                {/*<span>{this.dateFormat(this.props.memo.updated_at)}</span>*/}
              </div>
            </Container>
          </header>
          <Container>
            <div dangerouslySetInnerHTML={this.getContentHtml()} />
          </Container>
        </article>
        <Footer />
      </Root>
    )
  }
}

export default connect((state, route) => {
  return {
    title: route.params.title,
    memo: state.memo.detail.items[route.params.title] || {}
  }
})(Memo)
