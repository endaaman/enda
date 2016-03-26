import React, {Component} from 'react'
import { reduxForm } from 'redux-form'

function validate(values) {
  const errors = {}
  if (!values.title) {

  }
  return errors
}

class CommonInput extends Component {
  render() {
    return (
      <div className={styles.input}>
        <input type="text" />
      </div>
    )
  }
}


class MemoForm extends Component {
  render() {
    const { fields: {title, digest, draft, content}, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="title" {...title}/>
        </div>
        <div>
          <label><input type="checkbox" {...draft}></input>is draft</label>
        </div>
        <div>
          <input type="text" placeholder="digest" {...digest}/>
        </div>
        <div>
          <textarea placeholder="content" {...content}/>
        </div>
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
