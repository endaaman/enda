import React, {Component} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { Text, Checkbox, Editor } from '../components/controls'

function validate(values) {
  const errors = {}
  if (!values.title) {

  }
  return errors
}



class MemoForm extends Component {
  componentWillMount() {
    console.log('mount')
    let { title, draft, digest, content } = this.props.memo
    this.props.initializeForm({ title, draft, digest, content })
  }
  render() {
    const { fields: {title, digest, draft, content}, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Text field={title} placeholder="title" />
        <Text field={digest} placeholder="digest" />
        <Checkbox field={draft} label="draft" id="draft" />
        <Editor field={content} placeholder="content" />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'memo',
  fields: ['title', 'digest', 'draft', 'content'],
  validate
})(MemoForm)
