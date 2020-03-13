import { connect } from 'react-redux'
import CreatePage from './create_page'
import { createNewWorkspace, clearWorkspaceErrors, setCurrentWorkspace } from '../../actions/workspaces'
import { setCurrentChannel, clearChannelErrors, createNewChannel } from '../../actions/channels';

const mapStateToProps = (state) => ({
  errors: state.errors.workspaces,
  currentWorkspace: state.session.currentWorkspace
})

export default connect(
  mapStateToProps,
  { createNewWorkspace, clearWorkspaceErrors,
    setCurrentWorkspace, setCurrentChannel,
    clearChannelErrors, createNewChannel })(CreatePage)