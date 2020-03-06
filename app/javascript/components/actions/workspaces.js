import { createWorkspace, getCurrentWorkspaces } from '../util/workspaces_api';

export const RECEIVE_WORKSPACES = "RECEIVE_WORKSPACES",
  receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});

export const RECEIVE_WORKSPACE = "RECEIVE_WORKSPACE",
  receiveWorkspace = workspace => ({
    type: RECEIVE_WORKSPACE,
    workspace
  });

export const RECEIVE_WORKSPACE_ERRORS = "RECEIVE_WORKSPACE_ERRORS",
  receiveWorkspaceErrors = errors => ({
    type: RECEIVE_WORKSPACE_ERRORS,
    errors
  });

export const CLEAR_WORKSPACE_ERRORS = "CLEAR_WORKSPACE_ERRORS",
  clearWorkspaceErrors = () => dispatch => dispatch({
    type: CLEAR_WORKSPACE_ERRORS
  });


export const createNewWorkspace = workspace => dispatch => createWorkspace(workspace)
  .then(({ok, res}) => ok 
    ? dispatch(receiveWorkspace(res)) 
    : dispatch(receiveWorkspaceErrors(res)));

export const getWorkspaces = user => dispatch => getCurrentWorkspaces(user)
  .then(({ok, res}) => ok 
    ? dispatch(receiveWorkspaces(res)) 
    : dispatch(receiveWorkspaceErrors(res)))
  // .catch((err) => {
  //   debugger
  // });