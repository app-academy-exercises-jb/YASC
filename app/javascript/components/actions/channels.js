import { create, del, getCounts, join, leave, update } from '../util/channels_api'
import { getMessages } from './messages';

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

export const RECEIVE_CHANNEL_COUNT = "RECEIVE_CHANNEL_COUNT",
  receiveChannelCount = count => ({
    type: RECEIVE_CHANNEL_COUNT,
    count
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

export const SET_JOINED_CHANNELS = "SET_JOINED_CHANNELS",
  setJoinedChannels = channels => dispatch => dispatch({
    type: SET_JOINED_CHANNELS,
    channels
  });

export const ADD_JOINED_CHANNEL = "ADD_JOINED_CHANNEL",
  addJoinedChannel = channel => dispatch => dispatch({
    type: ADD_JOINED_CHANNEL,
    channel
  });

export const REMOVE_JOINED_CHANNEL = "REMOVE_JOINED_CHANNEL",
  removeJoinedChannel = channel => dispatch => dispatch({
    type: REMOVE_JOINED_CHANNEL,
    channel
  });

export const createNewChannel = channel => dispatch => create(channel)
  .then(({ok, res}) => ok 
    ? dispatch(receiveChannel(res)) 
    : dispatch(receiveChannelErrors(res)));

export const getChannelCounts = id => dispatch => getCounts(id)
  .then(({ok, res}) => ok
    ? dispatch(receiveChannelCount(res)) 
    : dispatch(receiveChannelErrors(res))); 

export const deleteChannel = channel => dispatch => del(channel)
  .then(({ok, res}) => ok 
    ? dispatch(removeChannel(channel)) 
    : dispatch(receiveChannelErrors(res)));

export const updateChannel = channel => dispatch => update(channel)
  .then(({ok, res}) => ok 
    ? dispatch(receiveChannel(res)) 
    : dispatch(receiveChannelErrors(res)));

export const joinChannel = channel => dispatch => join(channel.id)
  .then(({ok, res}) => ok 
    ? dispatch(addJoinedChannel(channel))
    : dispatch(receiveChannelErrors(res)));

export const leaveChannel = channel => dispatch => leave(channel.id)
  .then(({ok, res}) => ok 
    ? dispatch(removeJoinedChannel(channel)) 
    : dispatch(receiveChannelErrors(res)));