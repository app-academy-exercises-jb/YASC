import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import errorsReducer from './errors';
import sessionReducer from './session'

export const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
}

const rootReducer = combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  session: sessionReducer
});

export default rootReducer;