import React from 'react'
import { Route } from 'react-router'
import App from '../containers/App'
import Signup from '../containers/Signup'
import ForgotPassword from '../containers/ForgotPassword'

export default (
  <Route path="/" component={App}>
    <Route path="/signup"
           component={Signup} />
    <Route path="/forgotpassword"
           component={ForgotPassword} />
  </Route>
)
