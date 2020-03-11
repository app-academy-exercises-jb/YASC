import { RECEIVE_CHANNEL, RECEIVE_CHANNELS, DELETE_CHANNEL } from '../actions/channels'
import { CLEAR_ENTITIES } from '../actions/session'

export default (state={}, action) => {
  let channels = {};
  switch (action.type) {
    case RECEIVE_CHANNELS:

      action.channels.forEach((channel) => {
        channels[channel.id] = channel;
      });
      
      return channels;
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, {[action.channel.id]: action.channel});
    case DELETE_CHANNEL:
      channels = Object.assign({}, state);
      delete channels[action.channel.id];
      return channels;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
}