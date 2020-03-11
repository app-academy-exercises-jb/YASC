import { combineReducers } from 'redux';
import usersReducer from './users';
import workspacesReducer from './workspaces'
import channelsReducer from './channels'

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer,
  channels: channelsReducer
});

export default entitiesReducer;