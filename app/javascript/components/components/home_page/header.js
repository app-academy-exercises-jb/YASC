import React from 'react';
import { Link } from 'react-router-dom';
import Greeting from './greeting';
import slackLogo from 'images/slack'


class Header extends React.Component {
  render() {
    const user = this.props.user,
      className = this.props.className;

    return (
      <header className={className}>
        <Link to="/" id="logo">
          <img src={slackLogo} /> 
          <span>yasc</span>
        </Link>
        <Greeting
          user={user} 
          logoutUser={this.props.logoutUser}
          getWorkspaces={this.props.getWorkspaces}
          setCurrentWorkspace={this.props.setCurrentWorkspace}
          workspaces={this.props.workspaces}
        />
      </header>
    )
  }
}

export default Header