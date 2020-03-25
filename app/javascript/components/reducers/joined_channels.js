import { ADD_JOINED_CHANNEL, REMOVE_JOINED_CHANNEL, SET_JOINED_CHANNELS } from '../actions/channels'
import { CLEAR_ENTITIES } from '../actions/session'

export default (state={}, action) => {
  const channels = Object.assign({}, state);
  switch (action.type) {
    case SET_JOINED_CHANNELS:
      action.channels.forEach(el => channels[el[0]] = el[1]);
      return channels;
    case ADD_JOINED_CHANNEL:
      channels[action.channel.workspace_id].push(action.channel.id);
      return channels
      case REMOVE_JOINED_CHANNEL:
      const idx = channels[action.channel.workspace_id].findIndex(el => el === action.channel.id);
      if (idx === -1) return state;
      channels[action.channel.workspace_id].splice(idx,1);
      return channels;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
}