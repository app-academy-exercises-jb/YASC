import { combineReducers } from 'redux';
import sessionErrors from './session_errors';
import workspacesErrors from './workspace_errors'

const errorsReducer = combineReducers({
  session: sessionErrors,
  workspaces: workspacesErrors
});

export default errorsReducer;