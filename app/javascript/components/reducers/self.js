import { combineReducers } from 'redux';
import joinedChannelsReducer from './joined_channels';

const entitiesReducer = combineReducers({
  channels: joinedChannelsReducer
});

export default entitiesReducer;