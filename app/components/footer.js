import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

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
    const active = !!this.props.session.user
    return (
      <footer>
        <div className={styles.footerShadow}></div>
        <div className={styles.footer}>
          <div className={styles.rightItem}>
            <span>Built at {this.state.builtAt}</span>
          </div>
          <div className={styles.leftItem}>
            <span>
              <Link to={active ? '/logout' : '/login'}>
                {active ? 'Logout' : 'Login'}
              </Link>
              </span>
          </div>
        </div>
      </footer>
    )
  }
}



export default connect((state)=>({
  session: state.session
}))(Footer)
