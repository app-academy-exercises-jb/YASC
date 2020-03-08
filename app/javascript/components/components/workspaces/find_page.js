import React from 'react';
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import { Link } from 'react-router-dom';

class FindPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { workspaces, getWorkspaces, user } = this.props;
    Object.keys(workspaces).length === 0 && getWorkspaces(user)
  }

  render() {
    const { workspaces } = this.props;
    return (
      <>
        <HeaderContainer className="front-page-header" />
        <div id="find-page">
          <div className="find-page-contents"> 

            {Object.keys(workspaces).length === 0 && <div className="workspaces-list">
              <div id="workspaces-no-content">
                <h1>Uh oh, there's nothing here...</h1>
                <p>Perhaps you'd like to <Link to="/create">create a new workspace</Link>?</p>
              </div>
            </div>}

            {Object.keys(workspaces).length !== 0  && <div className="workspaces-list">
              <div>
                <h1>Your workspaces</h1>
                <p>You're already a member of these yasc teams:</p>
              </div>

              {Object.keys(workspaces).map(wsId => (
                <Link 
                  key={wsId}
                  className="workspaces-list-item"
                  to="/app"
                  onClick={() => {this.props.setCurrentWorkspace(wsId)}}
                >
                  <span>{workspaces[wsId].name}</span>
                  <button>Launch</button>
                </Link>
              ))}

              <span>Looking for a different workspace? You can try logging in as <Link to="#" onClick={() => this.props.logoutUser(this.props.user) }>someone else</Link>.</span>
            </div>}

          </div>

          <Footer/>
        </div>
      </>
    )
  }
}

export default FindPage;