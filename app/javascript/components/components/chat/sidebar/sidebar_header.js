import React from 'react';
import AvailableImg from 'images/available';
import DefaultUserImg from 'images/default_user';
import { Link } from 'react-router-dom';
import InviteFormContainer from './invite_form_container'

class SideBarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false,
      inviteModalVisible: false
    }

    this.dropdownRef = React.createRef();
    this.inviteModalRef = React.createRef();
    this.inviteFormRef = React.createRef();
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  hideModal(e) {
    if ((e && this.inviteModalRef.current && !this.inviteModalRef.current.contains(e.target)) || !e) {
      this.setState({inviteModalVisible: false});
      this.props.clearUserErrors()
      document.removeEventListener("click", this.hideModal);
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
              <Link 
                to="#"
                onClick={() => {
                  document.removeEventListener("click", this.hideDropdown);
                  document.addEventListener("click", this.hideModal);
                  this.setState({
                    inviteModalVisible: true,
                    dropdownVisible: false
                  })
                }}
              >Invite people</Link>
              {/* put total messages count here */}
            </section>

            <section id="user-actions">
              <Link 
                to="#"
                onClick={() => {
                  this.setState({dropdownVisible: false});
                  document.removeEventListener("click", this.hideDropdown);
                  user.session_token = this.props.sessionToken;
                  logoutUser(user)
                }}
              >Sign out</Link>
              <Link to="/">Home Page</Link>
            </section>
          </div>
        }

        {this.state.inviteModalVisible &&
        <div id="modal">
          <div ref={this.inviteModalRef} id="invite-modal" className="add-modal-wrapper">
            <div className="add-modal-content">
              <span>
                <h1>Invite people to {currentWorkspace.name}</h1>
                <button id="add-modal-button" onClick={() => {
                  this.setState({inviteModalVisible: false});
                  this.props.clearUserErrors();
                  document.removeEventListener("click", this.hideModal);
                }}>
                  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="-255 347 100 100" aria-hidden="true"><path d="M-160.4 434.2l-37.2-37.2 37.1-37.1-7-7-37.1 37.1-37.1-37.1-7 7 37.1 37.1-37.2 37.2 7.1 7 37.1-37.2 37.2 37.2"></path>
                  </svg>
                </button>
              </span>

              <InviteFormContainer
                ref={ref => this.inviteFormRef = ref} 
                hideModal={this.hideModal}
              />
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default SideBarHeader;