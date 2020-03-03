import React from 'react';
import { Link } from 'react-router-dom';
import Greeting from './greeting';
import slackLogo from 'images/slack'


class Header extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <header className="header">
        <Link to="/" id="logo">
          <img src={slackLogo} /> 
          <span>yasc</span>
        </Link>
        <Greeting user={user} />
      </header>
    )
  }
}

export default Header