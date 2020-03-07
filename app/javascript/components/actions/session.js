import { login, logout, signup, logoutOthers } from '../util/session_api'
import { update } from '../util/users_api'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER",
  receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
  });

export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER",
  logoutCurrentUser = user => ({
    type: LOGOUT_CURRENT_USER,
    user
  });

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS",
  receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });

export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS",
  clearSessionErrs = () => ({
    type: CLEAR_SESSION_ERRORS
  });

export const clearSessionErrors = () => dispatch => dispatch(clearSessionErrs());

export const CLEAR_ENTITIES = "CLEAR_ENTITIES";
const clearEntities = () => ({
  type: CLEAR_ENTITIES
})

export const loginUser = user => dispatch => login(user)
  .then(({ok, res}) => ok 
    ? dispatch(receiveCurrentUser(res)) 
    : dispatch(receiveSessionErrors(res)));

export const logoutUser = user => dispatch => logout(user)
  .then(({ok, res}) => ok 
    ? (dispatch(logoutCurrentUser(res)) 
      && dispatch(clearEntities()) 
      && dispatch(clearSessionErrors()))
    : dispatch(receiveSessionErrors(res)));

export const logoutOtherSessions = user => dispatch => logoutOthers(user)
  .then(({ok, res}) => ok 
    ? null
    : dispatch(receiveSessionErrors(res)));

export const createNewUser = user => dispatch => signup(user)
  .then(({ok, res}) => ok 
    ? dispatch(receiveCurrentUser(res)) 
    : dispatch(receiveSessionErrors(res)));

export const updateUser = user => dispatch => update(user)
  .then(({ok, res}) => ok
    ? dispatch(receiveCurrentUser(res)) 
    : dispatch(receiveSessionErrors(res)));