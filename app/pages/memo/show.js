import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
// import marked from 'marked'
import MarkdownComponent from 'react-markdown'

import NoMacth from '../no_match'

import Container from '../../components/container'
import Modal from '../../components/modal'
import NotFound from '../../components/not_found'

import { showToast} from '../../actions/toast'
import { getMemo, deleteMemo } from '../../actions/memo'
import { findMemo, getMarkdownRenderers } from '../../util'

import styles from '../../styles/memo.css'


class MemoShow extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static loadProps({ dispatch, params }) {
    return dispatch(getMemo(params.path))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
  }

  openModal(e) {
    e.preventDefault()
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal(e) {
    e.preventDefault()
    this.setState({
      modalIsOpen: false
    })
  }

  deleteMemo() {
    const { dispatch } = this.props
    const title = this.props.memo.title
    dispatch(deleteMemo(this.props.memo._id))
    .then(()=> {
      dispatch(showToast(`deleted "${title}"`))
      this.context.router.push('/')
    }, err => {
      dispatch(showToast('Something wrong'))
    })
  }

  dateFormat(date) {
    const _d = new Date(date)
    const y = _d.getFullYear()
    const m = _d.getMonth()
    const d = _d.getDate() + 1
    return `${y}年${m}月${d}日`
  }

  getContentHtml() {
    const html = marked(this.props.memo.content)
    return {
      __html: html
    }
  }

  render() {
    const ok = memo => {
      const metas = [
        // { name: 'twitter:image', content: icon },
        // { property: 'og:image', content: icon },
        { name: 'description', content: memo.digest },
        { name: 'twitter:description', content: memo.digest },
        { property: 'og:description', content: memo.digest },
      ]

      return (<div>
        <Helmet title={memo.title} meta={metas} />
        <header className={styles.header}>
          <Container>
            <h1 className={styles.title}>
              <Link to={this.props.location.pathname}>{memo.title}</Link>
            </h1>
            <div className={styles.date}>
              <span>{this.dateFormat(memo.created_at)}</span>
              { this.props.session.user
                  ? <span>
                    <span> </span>
                    <Link to={`/memos/${memo._id}/edit`}>edit</Link>
                    <span> </span>
                    <a onClick={this.openModal.bind(this)} href="#">delete</a>
                  </span>
                  : null
              }
            </div>
          </Container>
        </header>
        <Container>
          <MarkdownComponent source={memo.content} renderers={getMarkdownRenderers()}/>
        </Container>
        <Modal
          isOpen={this.state.modalIsOpen}>
          <button onClick={this.deleteMemo.bind(this)}>delete</button>
          <span> </span>
          <button onClick={this.closeModal.bind(this)}>close</button>
        </Modal>
      </div>)
    }
    const memo = this.props.memo

    return (
      <article>
        { this.props.notFound
          ? (<NotFound />)
          : memo
            ? ok(memo)
            : null
        }
      </article>
    )
  }
}

export default connect((state, ownProps) => ({
  memo: findMemo(state.memo.detail.items, ownProps.params.path),
  notFound: state.memo.detail.noMatches.indexOf(ownProps.params.path) > -1,
  session: state.session,
}))(MemoShow)
