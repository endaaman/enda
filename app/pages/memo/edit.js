import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import marked from 'marked'

import Container from '../../components/container'
import NotFound from '../../components/not_found'
import MemoForm from '../../forms/memo'

import NoMacth from '../no_match'

import { getMemo } from '../../actions/memo'
import { findMemo } from '../../util'

class MemoShow extends Component {
  static loadProps({dispatch, params}) {
    return dispatch(getMemo(params.path))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }

  onSubmit(data) {
    console.log(data)
  }
  render() {
    const ok = (memo)=> (
      <Container>
        <MemoForm onSubmit={this.onSubmit.bind(this)} memo={memo}/>
      </Container>
    )
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
