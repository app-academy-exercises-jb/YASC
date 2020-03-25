import { connect } from 'react-redux';
import ChatClient from './client';
import { setCurrentWorkspace, getWorkspaces } from '../../actions/workspaces';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
  workspaces: state.entities.workspaces
});

export default connect(
  mapStateToProps,
  { setCurrentWorkspace, getWorkspaces })
  (ChatClient);