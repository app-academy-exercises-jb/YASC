import { RECEIVE_CURRENT_USER, CLEAR_ENTITIES } from '../actions/session'
import { RECEIVE_USERS, RECEIVE_USER } from '../actions/users'

export default (state={}, action) => {
  let users = {};
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.user.id]: action.user});
    case RECEIVE_USERS:
      action.users.forEach((user) => {
        users[user.id] = user;
      });
      return users;
    case RECEIVE_USER:
      users = Object.assign({}, state);
      users[action.user.id] = action.user;
      return users;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
}