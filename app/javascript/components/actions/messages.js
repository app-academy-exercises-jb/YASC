import { create, del, get, update} from '../util/messages_api';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES",
  receiveMessages = ({messages, channel_id}) => ({
    type: RECEIVE_MESSAGES,
    messages,
    channel_id
  });

export const REMOVE_MESSAGE = "REMOVE_MESSAGE",
  removeMessage = message => ({
    type: REMOVE_MESSAGE,
    message
  });

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE",
receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS",
  receiveMessageErrors = errors => ({
    type: RECEIVE_MESSAGE_ERRORS,
    errors
  });

export const CLEAR_MESSAGE_ERRORS = "CLEAR_MESSAGE_ERRORS",
  clearMessageErrors = () => dispatch => dispatch({
    type: CLEAR_MESSAGE_ERRORS
  });

export const createNewMessage = message => dispatch => create(message)
  .then(({ok, res}) => ok 
    ? dispatch(receiveMessage(res)) 
    : dispatch(receiveMessageErrors(res)));

export const deleteMessage = message => dispatch => del(message)
  .then(({ok, res}) => ok 
    ? dispatch(removeMessage(Message)) 
    : dispatch(receiveMessageErrors(res)));
  
export const updateMessage = message => dispatch => update(message)
  .then(({ok, res}) => ok 
    ? dispatch(receiveMessage(res)) 
    : dispatch(receiveMessageErrors(res)));
  
export const getMessages = ({ id }) => dispatch => get(id)
  .then(({ok, res}) => ok
    ? dispatch(receiveMessages(res))
    : dispatch(receiveMessageErrors(res)))
  .catch(res => {debugger})
