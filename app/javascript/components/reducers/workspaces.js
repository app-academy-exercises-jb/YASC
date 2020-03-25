import { RECEIVE_WORKSPACE, RECEIVE_WORKSPACES, DELETE_WORKSPACE } from '../actions/workspaces'
import { CLEAR_ENTITIES } from '../actions/session'

export default (state={}, action) => {
  let workspaces = {};
  switch (action.type) {
    case RECEIVE_WORKSPACES:

      action.workspaces.forEach((workspace) => {
        workspaces[workspace.id] = workspace;
      });
      
      return workspaces;
    case RECEIVE_WORKSPACE:
      return Object.assign({}, state, {[action.workspace.id]: action.workspace});
    case DELETE_WORKSPACE:
      workspaces = Object.assign({}, state);
      delete workspaces[action.workspace.id];
      return workspaces;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
}