import { connect } from 'react-redux';
import { login } from 'reducers/registration';
import LoginForm from 'components/SignupForm';

function mapStateToProps( state ) {
  return {
    errorMessage: state.registration.errorMessage
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    register
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( SignupForm );
