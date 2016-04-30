import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Signup from './containers/Signup';
import ForgotPassword from './containers/ForgotPassword';
import Layout from './containers/Layout';
import Login from './containers/Login';

console.log( 'entry??' );
render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Login}></IndexRoute>
      <Route path="signup" component={Signup}></Route>
      <Route path="forgotpassword" component={ForgotPassword}></Route>
    </Route>
  </Router>,
document.getElementById( 'app' ));
