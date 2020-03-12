import { RECEIVE_MESSAGE, RECEIVE_MESSAGES, REMOVE_MESSAGE } from '../actions/messages'
import { CLEAR_ENTITIES } from '../actions/session'

export default (state={}, action) => {
  let messages = {};
  switch (action.type) {
    case RECEIVE_MESSAGES:
      messages[action.channel_id] = [];

      action.messages.forEach((message) => {
        if (messages[message.channel_id]) {
          messages[message.channel_id].push(message);
        } else {
          messages[message.channel_id] = [message];
        }
      });
      
      return messages;
    case RECEIVE_MESSAGE:
      messages = Object.assign({}, state);
      if (Array.isArray(messages[action.message.channel_id])) {
        messages[action.message.channel_id].push(action.message);
      } else {
        messages[action.message.channel_id] = [action.message];
      }
      return messages;
    case REMOVE_MESSAGE:
      messages = Object.assign({}, state);
      delete messages[action.message.id];
      return messages;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
}