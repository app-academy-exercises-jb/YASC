import { connect } from 'react-redux';
import SideBarDetail from './sidebar_detail';
import { setCurrentWorkspace } from '../../actions/workspaces';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  workspaces: state.entities.workspaces,
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace]
});

export default connect(
  mapStateToProps,
  null)
  (SideBarDetail);