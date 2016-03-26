import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import Helmet from 'react-helmet'

import Root from '../components/root'
import Container from '../components/container'
import Header from '../components/header'
import Footer from '../components/footer'

import { getMemos } from '../actions/memo'
import styles from '../styles/home.css'


class MemoList extends Component {
  dateFormat(date) {
    const _d = new Date(date)
    const y = _d.getFullYear()
    const m = _d.getMonth()
    const d = _d.getDate() + 1
    return `${y}年${m}月${d}日`
  }

  render() {
    const memos = this.props.memos
    return (
      <ul className={styles.memoList}>
        {
          memos.map(memo => (
            <li className={styles.memoItem} key={memo._id}>
              <Link to={`/memos/${memo.title}`}>
                <h3>{memo.title}</h3>
                <footer>{this.dateFormat(memo.created_at)}</footer>
              </Link>
            </li>
          ))
        }
      </ul>
    )
  }
}



class Home extends Component {
  static loadProps({dispatch}) {
    return dispatch(getMemos())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  render() {
    return (
      <Root>
        <Helmet
          title="Home"
        />
        <Header />
        <Container>
          <MemoList memos={this.props.memos} />
        </Container>
        <Footer />
      </Root>
    )
  }
}

export default connect(state => {
  return {
    memos: state.memo.list.items
  }
})(Home)
