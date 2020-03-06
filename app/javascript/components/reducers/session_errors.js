import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session'

export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {};
    case RECEIVE_SESSION_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_SESSION_ERRORS:
      return {};
    default:
      return state;
  }
}