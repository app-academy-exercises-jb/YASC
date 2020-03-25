import { RECEIVE_CHANNEL, RECEIVE_CHANNEL_ERRORS, CLEAR_CHANNEL_ERRORS } from '../actions/channels'

export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return {};
    case RECEIVE_CHANNEL_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_CHANNEL_ERRORS:
      return {};
    default:
      return state;
  }
}