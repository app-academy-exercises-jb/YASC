import { connect } from 'react-redux'
import AdminPage from './admin_page'
import { deleteWorkspace, updateWorkspace, clearWorkspaceErrors } from '../../actions/workspaces'
import { logoutOtherSessions, updateUser, clearSessionErrors } from '../../actions/session'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  workspaces: state.entities.workspaces,
  workspaceErrors: state.errors.workspaces,
  userErrors: state.errors.session
})

export default connect(
  mapStateToProps,
  { deleteWorkspace,
    updateWorkspace,
    clearWorkspaceErrors,
    logoutOtherSessions,
    updateUser,
    clearSessionErrors })
  (AdminPage)