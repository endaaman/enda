import React, {Component} from 'react'

import styles from '../styles/form.css'

class CommonInput extends Component {
  render() {
    return (
      <div className={styles.input}>
        <input type="text" />
      </div>
    )
  }
}

export default Root
