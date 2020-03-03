import { connect } from 'react-redux'
import Header from './header'
import { logoutUser } from '../../actions/session'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser]
})

export default connect(
  mapStateToProps,
  { logoutUser })(Header)