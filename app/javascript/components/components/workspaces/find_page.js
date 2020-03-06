import React from 'react';
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import { Link } from 'react-router-dom';

class FindPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { workspaces, getWorkspaces, currentUser } = this.props;
    Object.keys(workspaces).length === 0 && getWorkspaces(currentUser)
  }

  render() {
    const { workspaces } = this.props;
    return (
      <>
        <HeaderContainer className="front-page-header" />
        <div id="find-page">
          <div className="find-page-contents">
            

            {Object.keys(workspaces).length !== 0  && <div className="workspaces-list">
              <div>
                <h1>Your workspaces</h1>
                <p>You're already a member of these yasc teams:</p>
              </div>

              {Object.keys(workspaces).map(wsId => (
                <Link key={wsId} className="workspaces-list-item" to="#">
                  <span>{workspaces[wsId].name}</span>
                  <button>Launch</button>
                </Link>
              ))}
            </div>}
          </div>

          <Footer/>
        </div>
      </>
    )
  }
}

export default FindPage;