import { combineReducers } from 'redux';
import sessionErrors from './session_errors';
import workspacesErrors from './workspace_errors';
import channelsErrors from './channel_errors';
import messageErrors from './message_errors'

const errorsReducer = combineReducers({
  session: sessionErrors,
  workspaces: workspacesErrors,
  channels: channelsErrors,
  messages: messageErrors
});

export default errorsReducer;