import { connect } from 'react-redux'
import Banner from './banner'
import { loginUser } from '../../actions/session'

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUser]
})

export default connect(
  mapStateToProps,
  { loginUser})
  (Banner)