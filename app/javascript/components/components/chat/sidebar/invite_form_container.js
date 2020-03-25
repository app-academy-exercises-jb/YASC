import { connect } from 'react-redux'
import InviteForm from './invite_form'
import { inviteMember } from '../../../actions/workspaces'
import { getChannelCounts } from '../../../actions/channels'


const mapStateToProps = (state, {hideModal}) => {
  return (
    {
      errors: state.errors.users,
      user: state.entities.users[state.session.currentUser],
      currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
      currentChannel: state.session.currentChannel,
      hideModal
    }
  )
}

export default connect(
  mapStateToProps,
  { inviteMember, getChannelCounts },
  null,
  {forwardRef: true})(InviteForm)