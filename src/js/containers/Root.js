import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { bindActionCreators } from 'redux';
import routes from 'config/routes';
import { redirectToLoginWithMessage, logout } from 'reducers/authentication';
import { setupAxiosInterceptors } from 'api/interceptors';
import { registerLocales } from 'config/translation';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;

    const actions = bindActionCreators(
      {
        redirectToLoginWithMessage,
        logout
      },
      store.dispatch
    );

    registerLocales( store );
    setupAxiosInterceptors( () => actions.redirectToLoginWithMessage( 'login.error.unauthorized' ) );

    return (
      <Provider store={store}>
        <Router history={history} routes={routes( actions.logout )} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
