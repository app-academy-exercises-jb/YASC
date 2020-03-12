import { combineReducers } from 'redux';
import usersReducer from './users';
import workspacesReducer from './workspaces';
import channelsReducer from './channels';
import selfReducer from './self';
import messagesReducer from './messages';

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer,
  channels: channelsReducer,
  self: selfReducer,
  messages: messagesReducer
});

export default entitiesReducer;