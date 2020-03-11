import { create, del, get, join, leave, update } from '../util/channels_api'

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS",
  receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const DELETE_CHANNEL = "DELETE_CHANNEL",
  removeChannel = channel => ({
  type: DELETE_CHANNEL,
  channel
});

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL",
  receiveChannel = channel => ({
    type: RECEIVE_CHANNEL,
    channel
  });

export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS",
  receiveChannelErrors = errors => ({
    type: RECEIVE_CHANNEL_ERRORS,
    errors
  });

export const CLEAR_CHANNEL_ERRORS = "CLEAR_CHANNEL_ERRORS",
  clearChannelErrors = () => dispatch => dispatch({
    type: CLEAR_CHANNEL_ERRORS
  });

export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL",
  setCurrentChannel = id => dispatch => dispatch({
    type: SET_CURRENT_CHANNEL,
    id
  });

export const createNewChannel = channel => dispatch => create(channel)
  .then(({ok, res}) => ok 
    ? dispatch(receiveChannel(res)) 
    : dispatch(receiveChannelErrors(res)));

export const getChannelInfo = id => dispatch => get(id)
  .then(({ok, res}) => ok
    ? dispatch(receiveChannels(res)) 
    : dispatch(receiveChannelErrors(res))); 

export const deleteChannel = channel => dispatch => del(channel)
.then(({ok, res}) => ok 
  ? dispatch(removeChannel(channel)) 
  : dispatch(receiveChannelErrors(res)));

export const updateChannel = channel => dispatch => update(channel)
  .then(({ok, res}) => ok 
    ? dispatch(receiveChannel(res)) 
    : dispatch(receiveChannelErrors(res)));

export const joinChannel = id => dispatch => join(id)
  .then(({ok, res}) => ok 
    ? dispatch(receiveChannel(res)) 
    : dispatch(receiveChannelErrors(res)));

export const leaveChannel = id => dispatch => leave(id)
  .then(({ok, res}) => ok 
    ? dispatch(removeChannel({channel: {id}})) 
    : dispatch(receiveChannelErrors(res)));