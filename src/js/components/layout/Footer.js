import React, { Component } from 'react';


export default class Footer extends Component {
  render() {
    const footerStyles = {
      marginTop: "30px",
    };

    return (
      <footer style={footerStyles}>
        <div class="row">
          <div class="col-lg-12">
            <p>Copyright &copy;</p>
          </div>
        </div>
      </footer>
    );
  }
}
