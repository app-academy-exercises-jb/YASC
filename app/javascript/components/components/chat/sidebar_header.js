import React from 'react';
import AvailableImg from 'images/available';
import DefaultUserImg from 'images/default_user';
import { Link } from 'react-router-dom';

class SideBarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false
    }

    this.dropdownRef = React.createRef();
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  showDropdown() {
    if (this.state.dropdownVisible) return;
    this.setState({dropdownVisible: true});
    document.addEventListener("click", this.hideDropdown);
  }

  hideDropdown(e) {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(e.target)) {
      this.setState({dropdownVisible: false});
      document.removeEventListener("click", this.hideDropdown);
    }
  }

  render() {
    const { logoutUser, user, currentWorkspace, iconId } = this.props;
    return (
      <div className="sidebar-header">
        <h2 onClick={this.showDropdown}>
          {currentWorkspace.name}
          <div id="header-dropdown-icon"></div>
          <div id="header-dropdown-icon-hider"></div>
        </h2>
        <span><img src={AvailableImg}/>{user.email}</span>

        {this.state.dropdownVisible && 
          <div ref={this.dropdownRef} className="sidebar-dropdown">
            <section id="user-info">
              <div id="user-info-header">
                <img src={DefaultUserImg} />
                <span>
                  <div id="display-name"><b>{user.displayName}</b></div>
                  <div id="real-name"><b>{user.email/*change me to name*/}</b></div>
                </span>
              </div>
              <Link to="#">{"Profile & account"}</Link>
            </section>

            <section id="workspace-info">
              <div id="workspace-info-header">
                <img src={require(`images/default_workspace_icons/${iconId}`)}/>
                <span>
                  <div id="workspace-name"><b>{currentWorkspace.name}</b></div>
                  <div id="workspace-location">{`${location.origin}/app/${currentWorkspace.id}`}</div>
                </span>
              </div>
              <Link to="#">Invite people</Link>
              {/* put total messages count here */}
            </section>

            <section id="user-actions">
              <Link 
                to="#"
                onClick={() => {
                  this.setState({dropdownVisible: false});
                  document.removeEventListener("click", this.hideDropdown);
                  logoutUser(user)
                }}
              >Sign out</Link>
              <Link to="/">Home Page</Link>
            </section>
          </div>
        }
      </div>
    )
  }
}

export default SideBarHeader;