export const RECEIVE_USERS = "RECEIVE_USERS",
  receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
  });

export const RECEIVE_USER = "RECEIVE_USER",
  receiveUser = user => ({
    type: RECEIVE_USER,
    user
  });

export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS",
  receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
  });

export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS",
  clearUserErrors = errors => ({
    type: CLEAR_USER_ERRORS,
    errors
  });
  