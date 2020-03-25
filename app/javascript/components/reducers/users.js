import { RECEIVE_CURRENT_USER, CLEAR_ENTITIES } from '../actions/session'

export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.user.id]: action.user});
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
}