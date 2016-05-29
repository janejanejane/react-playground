import React from "react";

export default class Signup extends React.Component {
  render() {
    return (
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        Username: <input type="text" />
        Password: <input type="text" />
        <button>Submit</button>
      </form>
    );
  }

  handleSubmit( e ) {
    console.log( e );
  }
}
