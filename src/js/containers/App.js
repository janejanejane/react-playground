import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession } from 'reducers/authentication';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';

export class App extends Component {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <div>
        { if( isAuthenticated ) {
            <Header />
            {this.props.children}
            <Footer />
          } else {
            APP
          }
        }

      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    getSession
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( App )
