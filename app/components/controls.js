import React, {Component} from 'react'
import Textarea from 'react-textarea-autosize'
import { uuid } from '../utils'
import styles from '../styles/controls.css'

export class Text extends Component {
  constructor(...props) {
    super(...props)
    this.state = {
      id: ''
    }
  }
  componentDidMount() {
    this.setState({
      id: uuid()
    })
  }
  render() {
    const { field, label, type, helpText } = this.props
    const { id } = this.state
    return (
      <div className={styles.text}>
        <input
          type={ ['text', 'password'].indexOf(type)
            ? type
            : 'text'
          }
          id={id}
          required="true"
          className={field.value ? styles.filled : null}
          placeholder={/*this.props.placeholder*/''}
          {...this.props.field} />
        { id ? <label htmlFor={id}>{label}</label> : null}
        <div className={styles.helpText}>{
          typeof helpText === 'function'
            ? helpText(field.value)
            : helpText
        }</div>
      </div>
    )
  }
}

export class Button extends Component {
  render() {
    return (
      <div className={styles.button}>
        <button {...this.props}>{this.props.children}</button>
      </div>
    )
  }
}


export class Checkbox extends Component {
  constructor(...props) {
    super(...props)
    this.state = {
      id: ''
    }
  }
  componentDidMount() {
    this.setState({
      id: uuid()
    })
  }
  render() {
    const { field, label } = this.props
    const { id } = this.state
    return (
      <div className={styles.checkbox}>
        <input
          id={this.state.id}
          type="checkbox"
          {...field} />
        <label htmlFor={this.state.id}>{label}</label>
      </div>
    )
  }
}

export class Editor extends Component {
  render() {
    const { field } = this.props
    return (
      <div className={styles.editor}>
        <Textarea
          {...field}
          placeholder={this.props.placeholder}></Textarea>
      </div>
    )
  }
}
