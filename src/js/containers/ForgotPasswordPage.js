import React from "react";

export default class ForgotPassword extends React.Component {
  render() {
    return (
      <div>
        <h1>ForgotPassword</h1>
        <form>
          <label>Username:</label>
          <input type="text" />
          <button>Ok</button>
        </form>
      </div>
    );
  }
}
