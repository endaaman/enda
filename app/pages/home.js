import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import Helmet from 'react-helmet'
import dateFormat from 'dateformat'

import Root from '../components/root'
import Container from '../components/container'
import Header from '../components/header'
import Footer from '../components/footer'

import { getMemos } from '../actions/memo'
import styles from '../styles/home.css'


import { showToast } from '../actions/toast'


class MemoList extends Component {
  render() {
    const memos = this.props.memos
    return (
      <ul className={styles.memoList}>
        {
          memos.map(memo => (
            <li className={styles.memoItem} key={memo._id}>
              <Link to={`/memo/${memo.slug}`}>
                <h3>{memo.title}</h3>
                <footer>
                  <div className={styles.digest}>{memo.digest}</div>
                  <div className={styles.date}>
                    { memo.draft ? <span style={{color: 'brown'}}>draft</span> : null}
                    <span> </span>
                    <span>{dateFormat(memo.created_at, 'yyyy年m月d日')}</span>
                    </div>
                </footer>
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
      <div>
        <Helmet
          title="Home"
        />
        { this.props.active
            ? (<Container>
              <h2>管理</h2>
              <ul>
                <li><Link to="/memo/new">Add memo</Link></li>
                <li><Link to="/file">Manage files</Link></li>
              </ul>
            </Container>)
            : null
        }
        <Container>
        <p>IT系医学生の雑記帳です。</p>
        </Container>
        <Container>
          <MemoList memos={this.props.memos} />
        </Container>
      </div>
    )
  }
}

export default connect(state => ({
  memos: state.memo.items,
  active: !!state.session.user,
}))(Home)
