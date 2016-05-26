import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <form onSubmit={ ( formData ) => this.handleSubmit( formData ) } >
          <label>Username:</label>
          <input
            type="email"
            id="username"
            name="username"
            value={this.state.username}
            onChange={handleChange} />
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
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
    this.setState({ e.target.name: e.target.value })
  }
}
