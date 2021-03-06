import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions'

export default function counter ( state = 0, action ) {
  switch( action.type ) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
