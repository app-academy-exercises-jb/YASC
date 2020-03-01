import { connect } from 'react-redux'
import Greeting from './greeting'
import { logoutUser } from '../../actions/session'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser]
})

export default connect(
  mapStateToProps,
  { logoutUser })(Greeting)