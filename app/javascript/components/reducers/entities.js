import { combineReducers } from 'redux';
import usersReducer from './users';
import workspacesReducer from './workspaces';
import channelsReducer from './channels';
import selfReducer from './self';

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer,
  channels: channelsReducer,
  self: selfReducer
});

export default entitiesReducer;