import React, {Component} from 'react'
import Textarea from 'react-textarea-autosize'

import styles from '../styles/controls.css'

export class Text extends Component {
  render() {
    const { field, label, type } = this.props

    return (
      <div className={styles.text}>
        <input
          type={ ['text', 'password'].indexOf(type)
            ? type
            : 'text'
          }
          placeholder={this.props.placeholder}
          {...this.props.field} />
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
  render() {
    const { id, field, label } = this.props
    return (
      <div className={styles.checkbox}>
        <input
          id={id}
          type="checkbox"
          {...field} />
        <label htmlFor={id}>{label}</label>
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
