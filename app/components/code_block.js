import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import cx from 'classnames'
import hljs from 'highlight.js'

import styles from '../styles/code_block.css'


class CodeBlock extends Component{
  static propTypes: {
    literal: React.PropTypes.string,
    language: React.PropTypes.string
  }

  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount () {
    this.highlightCode()
  }

  componentDidUpdate () {
    this.highlightCode()
  }

  highlightCode () {
    if (this.props.language) {
      hljs.highlightBlock(this.refs.code)
    }
  }

  render () {
    // console.log(this.props.language)
    return (
      <pre className={styles.codeBlock}>
          <code ref="code" className={cx(this.props.language, 'hljs')}>{this.props.literal}</code>
      </pre>
    )
  }
}

export default CodeBlock
