import { 
  create,
  getCurrent,
  del,
  update,
  boot } from '../util/workspaces_api';

import { receiveChannels } from './channels'

export const RECEIVE_WORKSPACES = "RECEIVE_WORKSPACES",
  receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});

export const DELETE_WORKSPACE = "DELETE_WORKSPACE",
  removeWorkspace = workspace => ({
  type: DELETE_WORKSPACE,
  workspace
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

export const createNewWorkspace = workspace => dispatch => create(workspace)
  .then(({ok, res}) => ok 
    ? dispatch(receiveWorkspace(res)) 
    : dispatch(receiveWorkspaceErrors(res)));

export const getWorkspaces = user => dispatch => getCurrent(user)
    .then(({ok, res}) => ok
      ? dispatch(receiveWorkspaces(res)) 
      : dispatch(receiveWorkspaceErrors(res))); 

export const deleteWorkspace = workspace => dispatch => del(workspace)
.then(({ok, res}) => ok 
  ? dispatch(removeWorkspace(workspace)) 
  : dispatch(receiveWorkspaceErrors(res)));

export const updateWorkspace = workspace => dispatch => update(workspace)
  .then(({ok, res}) => ok 
    ? dispatch(receiveWorkspace(res)) 
    : dispatch(receiveWorkspaceErrors(res)));

export const bootClient = id => dispatch => boot(id)
  .then(({ok, res}) => ok
    ? dispatch(receiveChannels(res.channels))
    : dispatch(receiveWorkspaceErrors(res)));

export const SET_CURRENT_WORKSPACE = "SET_CURRENT_WORKSPACE",
  setCurrentWorkspace = id => dispatch => dispatch({
    type: SET_CURRENT_WORKSPACE,
    id
  });