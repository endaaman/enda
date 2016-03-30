import React, {Component} from 'react'
import uuid from 'node-uuid'

import { Editor as Draft, EditorState} from 'draft-js'


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
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    const { field } = this.props
    const {editorState} = this.state;
    return (
      <div className={styles.editor}>
        <Draft editorState={editorState} onChange={this.onChange} />
      </div>
    )
  }
}