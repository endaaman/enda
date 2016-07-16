import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import cx from 'classnames'
import hljs from 'highlight.js'

import styles from '../styles/code_block.css'


class CodeBlock extends Component{
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      codeBlock: null,
    }
  }

  componentDidMount () {
    this.highlightCode()
  }

  componentDidUpdate () {
    this.highlightCode()
  }

  highlightCode () {
    if (this.props.language && this.state.codeBlock) {
      hljs.highlightBlock(this.state.codeBlock)
    }
  }

  render () {
    const codeElement = {...this.props.codeElement}
    codeElement.props = {...codeElement.props, ...{
      className: 'hljs'
    }}
    return (
      <pre
        className={cx(styles.codeBlock, this.props.language)}
        ref={(ref)=> this.setState({codeBlock: ref})}
        >
        {codeElement}
      </pre>
    )
  }
}

export default CodeBlock
