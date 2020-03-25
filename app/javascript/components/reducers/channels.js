import { RECEIVE_CHANNEL, RECEIVE_CHANNELS,
  DELETE_CHANNEL, RECEIVE_CHANNEL_COUNT } from '../actions/channels'
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
    case RECEIVE_CHANNEL_COUNT:
      const channel = Object.assign({}, state[action.count.id]);
      channel.member_count = action.count.member_count;
      return Object.assign({}, state, {[action.count.id]: channel});
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