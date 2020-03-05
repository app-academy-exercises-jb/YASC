import { connect } from 'react-redux'
import Header from './header'
import { logoutUser } from '../../actions/session'

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[state.session.currentUser],
  className: ownProps.className
})

export default connect(
  mapStateToProps,
  { logoutUser })(Header)