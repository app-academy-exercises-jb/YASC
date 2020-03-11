import { connect } from 'react-redux';
import { setCurrentChannel, getChannelCounts, 
  leaveChannel, deleteChannel, removeJoinedChannel } from '../../../actions/channels';
import ChannelHeader from './channel_header';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[state.session.currentUser],
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  currentChannel: state.entities.channels[state.session.currentChannel],
  currentChannels: state.entities.self.channels
});

export default connect(
  mapStateToProps,
  { setCurrentChannel, getChannelCounts, leaveChannel, deleteChannel, removeJoinedChannel })
  (ChannelHeader);