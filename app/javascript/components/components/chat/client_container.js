import { connect } from 'react-redux';
import ChatClient from './client';
import { setCurrentWorkspace, getWorkspaces, bootClient } from '../../actions/workspaces';
import { receiveMessage } from '../../actions/messages'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  workspaces: state.entities.workspaces,
  channels: state.entities.channels
});

export default connect(
  mapStateToProps,
  { setCurrentWorkspace, getWorkspaces, bootClient, receiveMessage })
  (ChatClient);