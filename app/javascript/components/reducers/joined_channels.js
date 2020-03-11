import { ADD_JOINED_CHANNEL, REMOVE_JOINED_CHANNEL, SET_JOINED_CHANNELS } from '../actions/channels'
import { CLEAR_ENTITIES } from '../actions/session'

export default (state=[], action) => {
  const channels = Object.assign([], state);
  switch (action.type) {
    case SET_JOINED_CHANNELS:
      return action.channels;
    case ADD_JOINED_CHANNEL:
      channels.push(parseInt(action.channel, 10));
      return channels
    case REMOVE_JOINED_CHANNEL:
      const idx = channels.findIndex(el => el === action.channel);
      if (idx === -1) return state;
      channels.splice(idx,1);
      return channels;
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
}