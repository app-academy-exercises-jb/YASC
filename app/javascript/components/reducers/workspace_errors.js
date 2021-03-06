import { RECEIVE_WORKSPACE, RECEIVE_WORKSPACE_ERRORS, CLEAR_WORKSPACE_ERRORS } from '../actions/workspaces'

export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      return {};
    case RECEIVE_WORKSPACE_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_WORKSPACE_ERRORS:
      return {};
    default:
      return state;
  }
}