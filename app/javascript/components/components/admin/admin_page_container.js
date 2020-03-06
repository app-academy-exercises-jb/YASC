import { connect } from 'react-redux'
import AdminPage from './admin_page'
import { deleteWorkspace, updateWorkspace } from '../../actions/workspaces'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser],
  workspaces: state.entities.workspaces
})

export default connect(
  mapStateToProps,
  { deleteWorkspace, updateWorkspace })
  (AdminPage)