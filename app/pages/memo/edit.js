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
            <pre><code>
              {JSON.stringify(this.props.memo)}
            </code></pre>
            <MemoForm onSubmit={this.onSubmit.bind(this)}/>

          </Container>
        </article>
        <Footer />
      </Root>
    )
  }
}


export default connect((state, ownProps) => ({
  memo: state.memo.detail.items.find((memo)=> {
    let found = false
    if (ownProps.params.title === memo.title) {
      found = true
    }
    if (ownProps.params.title === memo._id) {
      found = true
    }
    return found
  }) || {},
  session: state.session,
}))(MemoShow)
