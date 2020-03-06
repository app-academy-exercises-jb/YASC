import { connect } from 'react-redux'
import CreatePage from './create_page'
import { createNewWorkspace } from '../../actions/workspaces'

const mapStateToProps = (state) => {
  return (
    {
      currentUser: state.session.currentUser
    }
  )
}

export default connect(
  mapStateToProps,
  {createNewWorkspace})(CreatePage)