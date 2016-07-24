import React, {Component} from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { Text, Checkbox, Editor, Button } from '../components/controls'

import { listInline } from '../styles/utils.css'


function validate(values) {
  const errors = {}
  return errors
}

class MemoForm extends Component {
  componentWillMount() {
    const {
      slug = '',
      title = '',
      digest = '',
      draft = false,
      hidden = false,
      image_url = '',
      content = '',
    } = this.props.memo
    this.props.initializeForm({ slug, title, draft, hidden, digest, image_url, content })
  }
  render() {
    const { fields: { slug, title, digest, hidden, draft, image_url, content }, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Text field={slug} label="slug" placeholder="slug" pattern="[a-z0-9_-]{1,}" />
        <Text field={title} label="title" placeholder="title" required={true} />
        <Text field={digest} label="digest" placeholder="digest" />
        <Checkbox field={draft} label="draft" id="draft" />
        <Checkbox field={hidden} label="hidden" id="hidden" />
        <Text field={image_url} label="image url" placeholder="image url" />
        <Editor field={content} placeholder="content" />
        <Button onClick={handleSubmit}>Save</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'memo',
  fields: ['slug', 'title', 'digest', 'draft', 'hidden', 'image_url', 'content'],
  validate
})(MemoForm)
