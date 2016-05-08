import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <form onSubmit={ ( formData ) => this.handleSubmit( formData ) } >
          <input
            type="email"
            id="username" />
          <input
            type="password"
            id="password" />
          <div>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    )
  }

  handleSubmit( formData ) {
    const { username, password } = this.props;
    const { login } = this.props;
    login( username, password );
  }
}
