import { connect } from 'react-redux'
import SessionForm from './session_form'
import { loginUser, clearSessionErrors } from '../../actions/session'

const mapStateToProps = (state, { explain, redirect, pushHistory }) => ({
  type: "login",
  errors: state.errors.session,
  explain,
  redirect,
  pushHistory
})

export default connect(
  mapStateToProps,
  { 
    processForm: loginUser,
    clearSessionErrors: clearSessionErrors,
    loginUser
  })(SessionForm)