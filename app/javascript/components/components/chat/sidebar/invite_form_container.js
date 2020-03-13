import { connect } from 'react-redux'
import InviteForm from './invite_form'
import { inviteMember } from '../../../actions/workspaces'

const mapStateToProps = (state, {hideModal}) => {
  return (
    {
      errors: state.errors.users,
      user: state.entities.users[state.session.currentUser],
      currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
      hideModal
    }
  )
}

export default connect(
  mapStateToProps,
  { inviteMember },
  null,
  {forwardRef: true})(InviteForm)