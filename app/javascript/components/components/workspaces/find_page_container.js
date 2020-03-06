import { connect } from 'react-redux'
import FindPage from './find_page'
import { getWorkspaces } from '../../actions/workspaces'

const mapStateToProps = (state) => {
  return (
    {
      currentUser: state.session.currentUser,
      workspaces: state.entities.workspaces
    }
  )
}

export default connect(
  mapStateToProps,
  { getWorkspaces })(FindPage)