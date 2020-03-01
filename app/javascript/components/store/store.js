import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer, { thunk } from '../reducers/root_reducer'
import logger from 'redux-logger'

const configureStore = (preloadedState={}) => (
  createStore(
    rootReducer, 
    preloadedState, 
    applyMiddleware(
      thunk,
      logger
    )
  )
);

export default configureStore;