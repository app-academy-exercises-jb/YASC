import { combineReducers } from 'redux';
import usersReducer from './users';
import workspacesReducer from './workspaces'

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer
});

export default entitiesReducer;