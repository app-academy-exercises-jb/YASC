import { connect } from 'react-redux';
import { clearMessageErrors, receiveMessageErrors, 
  createNewMessage, deleteMessage, getMessages,
  updateMessage } from '../../../actions/messages';
import ChannelMessages from './channel_messages';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  users: state.entities.users,
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  currentChannel: state.entities.channels[state.session.currentChannel],
  messages: state.entities.messages
});

export default connect(
  mapStateToProps,
  { getMessages, createNewMessage })
  (ChannelMessages);