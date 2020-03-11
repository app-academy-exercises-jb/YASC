import { connect } from 'react-redux';
import WorkspacesSidebar from './workspaces_sidebar';
import { setCurrentWorkspace, bootClient } from '../../../actions/workspaces';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[state.session.currentUser],
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  workspaces: state.entities.workspaces,
  history: ownProps.history
});

export default connect(
  mapStateToProps,
  { setCurrentWorkspace, bootClient })
  (WorkspacesSidebar);