import { connect } from 'react-redux';
import Banner from './banner';
import { loginUser } from '../../actions/session';
import { getWorkspaces } from '../../actions/workspaces';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[state.session.currentUser],
  history: ownProps.history
});

export default connect(
  mapStateToProps,
  { loginUser, getWorkspaces })
  (Banner);