import { connect } from 'react-redux';
import WorkspacesSidebar from './workspaces_sidebar';
import { setCurrentWorkspace } from '../../actions/workspaces';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  workspaces: state.entities.workspaces
});

export default connect(
  mapStateToProps,
  { setCurrentWorkspace })
  (WorkspacesSidebar);