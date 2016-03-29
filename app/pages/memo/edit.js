import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import marked from 'marked'

import Root from '../../components/root'
import Header from '../../components/header'
import Container from '../../components/container'
import Footer from '../../components/footer'
import MemoForm from '../../forms/memo'

import NoMacth from '../404'

import { getMemo } from '../../actions/memo'
import { findMemo } from '../../util'

class MemoShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notFound: false
    }
  }
  static loadProps({dispatch, params}) {
    return dispatch(getMemo(params.title))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
    .catch(()=> {
      this.setState({
        notFound: true
      })
    })
  }

  onSubmit(data) {
    console.log(data)
  }
  render() {
    const memo = this.props.memo
    if (this.state.notFound) {
      return (<NoMacth />)
    }
    return (
      <Root>
        <Helmet
          title={`Edit - ${this.props.memo.title}`}
        />
        <Header />
        <article>
          <Container>
            <MemoForm onSubmit={this.onSubmit.bind(this)} memo={memo}/>

          </Container>
        </article>
        <Footer />
      </Root>
    )
  }
}


export default connect((state, ownProps) => ({
  memo: findMemo(state.memo.detail.items, ownProps.params.title) || {},
  session: state.session,
}))(MemoShow)
