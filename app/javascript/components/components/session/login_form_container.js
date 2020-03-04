import { connect } from 'react-redux'
import SessionForm from './session_form'
import { loginUser, clearSessionErrors } from '../../actions/session'

const mapStateToProps = (state) => ({
  type: "login",
  errors: state.errors.session
})

export default connect(
  mapStateToProps,
  { 
    processForm: loginUser,
    clearErrors: clearSessionErrors,
    loginUser
  })(SessionForm)