import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Greeting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownVisible: false
    }

    this.dropdownRef = React.createRef();
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.loadWorkspace = this.loadWorkspace.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getWorkspaces(this.props.user);
    }
  }
  
  hideDropdown(e) {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(e.target)) {
      this.setState({dropdownVisible: false});
      document.removeEventListener("click", this.hideDropdown);
    }
  }

  showDropdown() {
    if (this.state.dropdownVisible === true) return;
    this.setState({dropdownVisible: true});
    document.addEventListener("click", this.hideDropdown);
  }

  loadWorkspace(id) {
    this.props.setCurrentWorkspace(id)
  }

  render () {
    const { user, logoutUser } = this.props;
    if (user) {
      return (
        <div id="greeting" className='greeting'>

          <Link id="your-workspaces" onClick={this.showDropdown} to="#">Your Workspaces</Link>

          {this.state.dropdownVisible && (
            <div ref={this.dropdownRef} id="workspaces-dropdown">
              
              {Object.keys(this.props.workspaces).length > 0 && 
                <ul id="workspaces-dropdown-list">
                  {Object.keys(this.props.workspaces).map(ws => (
                    <li key={ws}>
                      <Link to="/app" onClick={() => this.loadWorkspace(ws)}>
                        {this.props.workspaces[ws].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              }

              <Link to="/find">See Your Workspaces</Link>
              <Link to="/create">Create Workspace</Link>
              <Link to="/admin">Settings</Link>
              <Link 
                onClick={() => {
                  this.setState({dropdownVisible: false});
                  document.removeEventListener("click", this.hideDropdown);
                  logoutUser(user)
                }}
                to="#"
              >Log out</Link>
            </div>
          )}

        </div>
      )
    } else {
      return (
        <div id="greeting" className='greeting'>
          <NavLink activeStyle={{display: "none"}} to="/login">Sign in</NavLink>
          <NavLink id="get-started" activeStyle={{display: "none"}} to="/signup">Get Started</NavLink>
        </div>
      )
    }
  }
}

export default Greeting;