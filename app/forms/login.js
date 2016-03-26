import React, {Component} from 'react'
import { reduxForm } from 'redux-form'


class LoginForm extends Component {
  render() {
    const { fields: {username, password}, handleSubmit, disabled } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="username" {...username}/>
        </div>
        <div>
          <input type="password" placeholder="password" {...password}/>
        </div>
        <button disabled={disabled} onClick={handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  fields: ['username', 'password'],
})(LoginForm)
