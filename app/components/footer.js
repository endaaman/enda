import React, {Component} from 'react'

import styles from '../styles/footer.css'


class Footer extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      builtAt: ''
    }
  }

  componentDidMount() {
    if (typeof global.__BUILT_AT__ !== 'undefined') {
      this.setState({
        builtAt: new Date(global.__BUILT_AT__).toLocaleString()
      })

    }
  }
  render() {
    // let builtAt = (new Date(window.__BUILT_AT__)).toString()
    return (
      <footer>
        <div className={styles.footerShadow}></div>
        <div className={styles.footer}>
          <div className={styles.buitTime}>Built at {this.state.builtAt}</div>
        </div>
      </footer>
    )
  }
}


export default Footer
