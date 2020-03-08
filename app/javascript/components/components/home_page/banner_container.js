import { connect } from 'react-redux'
import Banner from './banner'
import { loginUser } from '../../actions/session'
import { getWorkspaces } from '../../actions/workspaces'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser]
})

export default connect(
  mapStateToProps,
  { loginUser, getWorkspaces })
  (Banner)