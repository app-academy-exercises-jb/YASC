import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Greeting({ user, logoutUser }) {
  function workspacesModal(e) {
    e.preventDefault();
  }

  if (user) {
    return (<div className='greeting'>
      <Link id="your-workspaces" onClick={workspacesModal} to="#">Your Workspaces</Link>
    </div>)
  } else {
    return (<div className='greeting'>
      <NavLink activeStyle={{display: "none"}} to="/login">Sign in</NavLink>
      <NavLink id="get-started" activeStyle={{display: "none"}} to="/signup">Get Started</NavLink>
    </div>)
  }
}