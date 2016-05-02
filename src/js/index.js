// import React from 'react';
// import { render } from 'react-dom';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//
// import Signup from './containers/Signup';
// import ForgotPassword from './containers/ForgotPassword';
// import Layout from './containers/Layout';
// import Login from './containers/Login';
//
// // console.log( 'entry??' );
// // render(
// //   <Router history={browserHistory}>
// //     <Route path="/" component={Layout}>
// //       <IndexRoute component={Login}></IndexRoute>
// //       <Route path="signup" component={Signup}></Route>
// //       <Route path="forgotpassword" component={ForgotPassword}></Route>
// //     </Route>
// //   </Router>,
// // document.getElementById( 'app' ));
//
// import { createStore } from 'redux';
// import Counter from './components/Counter';
// import counter from './reducers';
//
// const store = createStore( counter );
//
// function renderCounter() {
//   render (
//     <Counter value={store.getState()}
//       onIncrement={() =>
//         store.dispatch({
//           type: 'INCREMENT'
//         })
//       }
//       onDecrement={() =>
//         store.dispatch({
//           type: 'DECREMENT'
//         })
//       } />,
//   document.getElementById( 'app' ))
// }
//
// renderCounter()
// store.subscribe( renderCounter )

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import Root from './containers/Root'

const store = configureStore()
const history = syncHistoryWithStore( browserHistory, store )

render(
  <Root store={store} history={history}/>,
  document.getElementById( 'root' )
)
