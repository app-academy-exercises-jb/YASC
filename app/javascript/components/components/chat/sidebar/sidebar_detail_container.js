import { connect } from 'react-redux';
import SideBarDetail from './sidebar_detail';
import { logoutUser } from '../../../actions/session';
import { setCurrentChannel, getChannelCounts, joinChannel } from '../../../actions/channels'
import { clearUserErrors } from '../../../actions/users'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  workspaces: state.entities.workspaces,
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  channels: state.entities.channels,
  joinedChannels: state.entities.self.channels
});

export default connect(
  mapStateToProps,
  { logoutUser, setCurrentChannel, getChannelCounts, joinChannel, clearUserErrors })(SideBarDetail);