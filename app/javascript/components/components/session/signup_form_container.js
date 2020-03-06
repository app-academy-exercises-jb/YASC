import { connect } from 'react-redux'
import SessionForm from './session_form'
import { createNewUser, clearSessionErrors, loginUser } from '../../actions/session'

const mapStateToProps = (state, { redirect, pushHistory }) => {
  return (
    {
      type: "signup",
      errors: state.errors.session,
      redirect,
      pushHistory,
      explain: true
    }
  )
}

export default connect(
  mapStateToProps,
  { processForm: createNewUser,
    clearSessionErrors: clearSessionErrors,
    loginUser })(SessionForm)