import React, {Component} from 'react'

import styles from '../styles/container.css'

class Root extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }
}

export default Root
