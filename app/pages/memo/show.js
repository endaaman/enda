import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import dateFormat from 'dateformat'
import MarkdownComponent from 'react-markdown'

import NoMacth from '../no_match'

import Container from '../../components/container'
import Modal from '../../components/modal'
import NotFound from '../../components/not_found'
import { Button } from '../../components/controls'

import { showToast} from '../../actions/toast'
import { getMemo, deleteMemo } from '../../actions/memo'
import { findMemo, getMarkdownRenderers } from '../../utils'

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
    if (e) {
      e.preventDefault()
    }
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


  render() {
    const ok = memo => {
      let metas = [
        { name: 'twitter:title', content: `${memo.title} | えんだーまんの家` },
      ]
      if (memo.digest) {
        metas = metas.concat([
          { name: 'description', content: memo.digest },
          { name: 'twitter:description', content: memo.digest },
          { property: 'og:description', content: memo.digest },
        ])
      }
      if (memo.image_url) {
        metas = metas.concat([
          { name: 'twitter:image', content: memo.image_url },
          { property: 'og:image', content: memo.image_url },
        ])
      }

      return (<div>
        <Helmet title={memo.title} meta={metas} />
        <header className={styles.header}>
          <Container>
            <h1 className={styles.title}>
              <Link to={this.props.location.pathname}>{memo.title}</Link>
            </h1>
            { memo.digest
                ? <div className={styles.digest}>{memo.digest}</div>
                : null
            }
            <div className={styles.date}>
              <span>{dateFormat(memo.created_at, 'yyyy年m月d日')}</span>
              { this.props.session.user
                  ? <span>
                    <span> </span>
                    <Link to={`/memo/${memo._id}/edit`}>edit</Link>
                    <span> </span>
                    <a onClick={this.openModal.bind(this)} href="#">delete</a>
                  </span>
                  : null
              }
            </div>
          </Container>
        </header>
        <Container>
          <div className={styles.content}>
            <MarkdownComponent source={memo.content} renderers={getMarkdownRenderers()}/>
          </div>
        </Container>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          >
          <p>Are you sure to delete <strong>{memo.title}</strong> ?</p>
          <Button onClick={this.deleteMemo.bind(this)}>delete</Button>
        </Modal>
      </div>)
    }
    const memo = this.props.memo

    return (
      <div>
        { this.props.notFound
          ? (<NotFound />)
          : memo
            ? ok(memo)
            : null
        }
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  memo: findMemo(state.memo.detail.items, ownProps.params.path),
  notFound: state.memo.detail.noMatches.indexOf(ownProps.params.path) > -1,
  session: state.session,
}))(MemoShow)
