import { RECEIVE_WORKSPACE, RECEIVE_WORKSPACES } from '../actions/workspaces'


export default (state={}, action) => {
  switch (action.type) {
    case RECEIVE_WORKSPACES:
      const workspaces = {};

      action.workspaces.forEach((workspace) => {
        workspaces[workspace.id] = workspace;
      });
      
      return workspaces;
    case RECEIVE_WORKSPACE:
      return Object.assign({}, state, {[action.workspace.id]: action.workspace});
    default:
      return state;
  }
}