import React, {Component} from 'react'
import { Link } from 'react-router'

import styles from '../styles/header.css'
import icon from '../assets/endaaman.png'

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.icon}>
          <Link to="/">
            <img src={icon} />
          </Link>
        </div>
        <div className={styles.message}>
          <span>@endaaman / </span>
          <span className={styles.links}>
            <a href="https://github.com/endaaman" target="_blank">Github</a>
            <span> - </span>
            <a href="http://twitter.com/endaaman" target="_blank">Twitter</a>
          </span>
          </div>
      </header>
    )
  }
}


export default Header
