import { connect } from 'react-redux';
import { login } from 'reducers/authentication';
import LoginForm from 'components/LoginForm';

// TODO: understand where login comes from

function mapStateToProps( state ) {
  return {
    errorMessage: state.authentication.errorMessage
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    login
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LoginForm );
