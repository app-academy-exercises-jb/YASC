import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session'

const _nullSession = {
  currentUser: null,
  sessionToken: null
};

export default (state=_nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, {
        currentUser: action.user.id, 
        sessionToken: action.user.session_token
      });
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
}