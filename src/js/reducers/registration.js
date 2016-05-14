import { browserHistory } from 'react-router';

const REGISTRATION = 'registration/REGISTRATION';
const REGISTRATION_SUCCESS = 'registration/REGISTRATION_SUCCESS';
const REGISTRATION_FAIL = 'registration/REGISTRATION_FAIL';

const ERROR_MESSAGE = 'registration/ERROR_MESSAGE';

export default function reducer( state = initialState, action ) {
  switch( action.type ) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.result.data.authenticated,
        username: action.result.data.username,
        errorMessage: null
      };
    case REGISTRATION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        errorMessage: action.error.data.messageKey
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.message
      }
    default:
      return state;
  }
}

export function displayRegError( message ) {
  return { type: ERROR_MESSAGE, message }
}

export function register( username, password ) {
  return {
    types: [ REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAIL ],
    promise: ( client ) => client.post( '/api/session', { username, password } ),
    afterSuccess: ( dispatch, getState, response ) => {
      localStorage.setItem( 'auth-token', response.headers[ 'x-auth-token' ] );
      const routingState = getState().routing.locationBeforeTransitions.state || {};
      browserHistory.push( routingState.nextPathname || '' );
    }
  }
}
