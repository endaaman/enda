import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import marked from 'marked'

import Container from '../../components/container'
import NotFound from '../../components/not_found'
import MemoForm from '../../forms/memo'

import { getMemos, createMemo } from '../../actions/memo'


class MemoEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit(data) {
    this.props.dispatch(createMemo(data))
    .then((memo)=> {
      this.context.router.push(`/memo/${memo.slug}`)
    })
  }
  render() {
    const memo = {}
    return (
      <Container>
        <MemoForm onSubmit={this.onSubmit.bind(this)} memo={memo}/>
      </Container>
    )

  }
}


export default connect((state, ownProps) => ({
  session: state.session,
}))(MemoEdit)
