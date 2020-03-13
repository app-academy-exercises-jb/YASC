import { RECEIVE_USER, RECEIVE_USER_ERRORS, CLEAR_USER_ERRORS } from '../actions/users'

export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {};
    case RECEIVE_USER_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_USER_ERRORS:
      return {};
    default:
      return state;
  }
}