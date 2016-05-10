import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import marked from 'marked'

import Container from '../../components/container'
import NotFound from '../../components/not_found'
import MemoForm from '../../forms/memo'

import NoMacth from '../no_match'

import { getMemos, updateMemo } from '../../actions/memo'
import { showToast } from '../../actions/toast'
import { findMemo } from '../../utils'

class MemoEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static loadProps({dispatch, params}) {
    return dispatch(getMemos())
  }
  constructor(props) {
    super(props)
    this.state = {
      memo: null,
      notFound: false,
    }
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
    this.retrieveMemo(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.retrieveMemo(nextProps)
  }

  retrieveMemo(props) {
    const { memos, params:{ path } } = props
    if (memos.length < 1) {
      return
    }
    let memo = memos.find(m => m._id === path)
    if (memo) {
      this.setState({ memo })
      return
    }
    this.setState({
      notFound: true
    })
  }

  onSubmit(data) {
    const { dispatch, memo } = this.props
    dispatch(updateMemo(memo._id, data))
    .then((newMemo)=> {
      dispatch(showToast('ok'))
      this.context.router.push(`/memo/${newMemo.slug}`)
    }, err => {
      dispatch(showToast('failed'))
    })
  }
  render() {
    if (this.state.notFound) {
      return <NotFound />
    }
    if (!this.state.memo) {
      return null
    }
    const memo = this.state.memo

    return (
      <Container>
        <p>
          <Link to={`/memo/${memo.slug}`}>Back to memo</Link>
        </p>
        <MemoForm onSubmit={this.onSubmit.bind(this)} memo={memo}/>
      </Container>
    )
  }
}


export default connect((state, ownProps) => ({
  memos: state.memo.items,
  session: state.session,
}))(MemoEdit)
