import { connect } from 'react-redux'
import SessionForm from './session_form'
import { createNewUser } from '../../actions/session'

const mapStateToProps = (state) => ({
  type: "signup",
  errors: state.errors.session
})

export default connect(
  mapStateToProps,
  { processForm: createNewUser })(SessionForm)