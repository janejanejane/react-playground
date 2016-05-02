import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../config/routes'
import { Router } from 'react-router'

export default class Root extends Component {
  render() {
    return (
      <Provider>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
