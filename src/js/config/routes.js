import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import ForgotPasswordPage from 'containers/ForgotPasswordPage';

export default ( onLogout ) => (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage}/>
    <Route path="signup" component={SignupPage} />
    <Route path="forgotpassword" component={ForgotPasswordPage} />
    <Route path="logout" onEnter={onLogout} />
  </Route>
)
