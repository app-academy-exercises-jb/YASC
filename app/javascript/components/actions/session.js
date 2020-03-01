import { login, logout, signup } from '../util/session_api'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const logoutCurrentUser = user => ({
  type: LOGOUT_CURRENT_USER,
  user
});

export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});


export const loginUser = user => dispatch => login(user)
  .then(({ok, res}) => ok 
    ? dispatch(receiveCurrentUser(res)) 
    : dispatch(receiveErrors(res)));

export const logoutUser = user => dispatch => logout(user)
  .then(({ok, res}) => ok 
    ? dispatch(logoutCurrentUser(res)) 
    : dispatch(receiveErrors(res)));

export const createNewUser = user => dispatch => signup(user)
  .then(({ok, res}) => ok 
    ? dispatch(receiveCurrentUser(res)) 
    : dispatch(receiveErrors(res)));

window.login = loginUser;
window.signup = createNewUser;