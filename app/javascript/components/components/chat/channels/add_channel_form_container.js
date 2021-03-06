import { connect } from 'react-redux'
import AddChannelForm from './add_channel_form'
import { createNewChannel, clearChannelErrors, addJoinedChannel, setCurrentChannel } from '../../../actions/channels'

const mapStateToProps = (state, {hideAddModal, hideModal}) => {
  return (
    {
      errors: state.errors.channels,
      user: state.entities.users[state.session.currentUser],
      currentWorkspace: state.entities.workspaces[state.session.currentWorkspace],
      hideAddModal,
      hideModal
    }
  )
}

export default connect(
  mapStateToProps,
  { createNewChannel, clearChannelErrors, addJoinedChannel, setCurrentChannel },
  null,
  {forwardRef: true})(AddChannelForm)