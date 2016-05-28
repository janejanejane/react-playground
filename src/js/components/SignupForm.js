import React from "react";

export default class Signup extends React.Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>
        Username: <input type="text" />
        Password: <input type="text" />
        <button>Submit</button>
      </div>
    );
  }

  handleSubmit( e ) {
    console.log( e );
  }
}
