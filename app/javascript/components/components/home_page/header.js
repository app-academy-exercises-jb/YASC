import React from 'react';
import { Link } from 'react-router-dom';
import Greeting from './greeting';


class Header extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <div className="header">
        <Link to="/" id="logo">
          <img src="https://image.flaticon.com/icons/svg/2111/2111615.svg"/> 
          <span>yasc</span>
        </Link>
        <Greeting user={user} />
      </div>
    )
  }
}

export default Header