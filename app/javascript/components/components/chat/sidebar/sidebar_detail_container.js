import { connect } from 'react-redux';
import SideBarDetail from './sidebar_detail';
import { logoutUser } from '../../../actions/session';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  workspaces: state.entities.workspaces,
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  channels: state.entities.channels
});

export default connect(
  mapStateToProps,
  { logoutUser })(SideBarDetail);