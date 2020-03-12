import { RECEIVE_MESSAGE, RECEIVE_MESSAGE_ERRORS, CLEAR_MESSAGE_ERRORS } from '../actions/messages'

export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {};
    case RECEIVE_MESSAGE_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_MESSAGE_ERRORS:
      return {};
    default:
      return state;
  }
}