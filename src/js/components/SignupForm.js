import React from "react";

export default class Signup extends React.Component {
  render() {
    return (
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        Username: <input type="text" onChange={handleChange}/>
        Password: <input type="text" onChange={handleChange}/>
        <button>Submit</button>
      </form>
    );
  }

  handleSubmit( e ) {
    console.log( e );
  }

  handleChange( e ) {
    console.log( e );
  }
}
