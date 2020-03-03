import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Greeting({ user }) {
  if (user) {
    return (<div className='greeting'>
      Hello {user.email}
      <button onClick={() => {this.props.logoutUser(user)}}>Log out</button>
    </div>)
  } else {
    return (<div className='greeting'>
      <NavLink activeStyle={{display: "none"}} to="/login">Sign in</NavLink>
      <NavLink id="get-started" activeStyle={{display: "none"}} to="/signup">Get Started</NavLink>
    </div>)
  }
}