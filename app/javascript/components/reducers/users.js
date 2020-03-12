import { RECEIVE_CURRENT_USER, CLEAR_ENTITIES } from '../actions/session'
import { RECEIVE_USERS } from '../actions/users'

export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.user.id]: action.user});
    case RECEIVE_USERS:
      const users = {};
      action.users.forEach((user) => {
        users[user.id] = user;
      });
      return users;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
}