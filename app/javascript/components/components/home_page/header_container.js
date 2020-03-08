import { connect } from 'react-redux'
import Header from './header'
import { logoutUser } from '../../actions/session'
import { getWorkspaces, setCurrentWorkspace } from '../../actions/workspaces'

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[state.session.currentUser],
  workspaces: state.entities.workspaces,
  className: ownProps.className
})

export default connect(
  mapStateToProps,
  { logoutUser, getWorkspaces, setCurrentWorkspace })(Header)