import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session'
import { SET_CURRENT_WORKSPACE } from '../actions/workspaces'

const _nullSession = {
  currentUser: null,
  currentWorkspace: null,
  sessionToken: null
};

export default (state=_nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, _nullSession, {
        currentUser: action.user.id, 
        sessionToken: action.user.session_token
      });
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    case SET_CURRENT_WORKSPACE:
      return Object.assign({}, state, {
        currentWorkspace: action.id
      })
    default:
      return state;
  }
}
