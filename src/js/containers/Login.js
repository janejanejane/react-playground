// import React from 'react';
//
// export default class Login extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Login</h1>
//       </div>
//     );
//   }
// }
import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    const { errorMessage } = this.props;
    return {
      <div>
        <Form onSubmit={ ( formData ) => this.handleSubmit( formData ) } >

          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      </div>
    }
  }

  handleSubmit( formData ) {
    const { username, password } = this.this.props;
    const { login } = this.props;
    login( username, password );
  }
}
