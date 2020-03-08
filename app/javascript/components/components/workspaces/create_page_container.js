import { connect } from 'react-redux'
import CreatePage from './create_page'
import { createNewWorkspace, clearWorkspaceErrors, setCurrentWorkspace } from '../../actions/workspaces'

const mapStateToProps = (state) => ({
  errors: state.errors.workspaces
})

export default connect(
  mapStateToProps,
  { createNewWorkspace, clearWorkspaceErrors, setCurrentWorkspace })(CreatePage)