import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <form onSubmit={ ( formData ) => this.handleSubmit( formData ) } >
          <label>Username:</label>
          <input
            type="email"
            id="username"
            onChange={handleChange} />
          <label>Password:</label>
          <input
            type="password"
            id="password"
            onChange={handleChange} />
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

  handleChange( e ) {
    console.log( 'handleChange' )
  }
}
