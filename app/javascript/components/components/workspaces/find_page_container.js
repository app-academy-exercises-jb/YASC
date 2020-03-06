import { connect } from 'react-redux'
import FindPage from './find_page'
import { getWorkspaces } from '../../actions/workspaces'
import { logoutUser } from '../../actions/session'

const mapStateToProps = (state) => {
  return (
    {
      user: state.entities.users[state.session.currentUser],
      workspaces: state.entities.workspaces
    }
  )
}

export default connect(
  mapStateToProps,
  { getWorkspaces, logoutUser })
  (FindPage)