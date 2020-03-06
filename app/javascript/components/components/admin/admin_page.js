import React from 'react';
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import { Route, Redirect, Link } from 'react-router-dom';


class AdminItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.itemRef = React.createRef();
    this.triggerContent = this.props.clickHandler ? 
      this.triggerContent.bind(this, this.props.clickHandler) : 
      this.triggerContent.bind(this);
  }

  triggerContent(f, e) {
    this.setState({expanded: !this.state.expanded});
    f && f(this.itemRef);
  }

  render() {
    const { title, content } = this.props;
    return(
      <div ref={this.itemRef} className="admin-page-item-wrapper">
        <div className="admin-page-item">
          <h2 onClick={this.triggerContent}>{ title }</h2>
          <button value="expand" onClick={this.triggerContent}>
            {this.state.expanded ? "close" : "expand"}
          </button>
        </div>
        {this.state.expanded && <div className="admin-page-item-content">
          {content}
        </div>}
      </div>
    )
  }
}

class AccountAdmin extends React.Component {
  constructor(props) {
    super(props)

    this.currentTabRef = React.createRef();
  }

  componentDidMount() {
    this.currentTabRef.current.id = "admin-nav-item-selected"
  }

  componentWillUnmount() {
    this.currentTabRef.current.id = ""
  }

  render() {
    return (<>
      <span id="admin-page-nav">
        <Link to="/admin/account"><h3 ref={this.currentTabRef}>Account</h3></Link>
        <Link to="/admin/workspaces"><h3>Workspaces</h3></Link>
      </span>
      <div id="admin-page-items-container">

        <AdminItem title={"Password"} content={<>
          <form className="session-form">
            <span>Current Password</span>
            <input type="password" name="currentPassword"  />

            <span>New Password</span>
            <input type="password" name="newPassword"  />

            <input type="submit" value="Save Password" />
          </form>
        </>} />

        <AdminItem user={this.props.user} title={"Email"} content={<>
          <form className="session-form">
            <p>Your email address is {this.props.user.email || ""}</p>
            <span>Current Password</span>
            <input type="password" name="password"  />

            <span>New Email</span>
            <input type="text" name="email" />

            <input type="submit" value="Update Email" />
          </form>
        </>} />

      </div>
    </>)
  }
}

class WorkspacesAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.currentTabRef = React.createRef();
    this.triggerCurrentWorkspace = this.triggerCurrentWorkspace.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  triggerCurrentWorkspace(e) {
    e.current.id = e.current.id === "" ? 
      "current-workspace" :
      ""
  }

  componentDidMount() {
    this.currentTabRef.current.id = "admin-nav-item-selected"
  }

  componentWillUnmount() {
    this.currentTabRef.current.id = ""
  }

  submitHandler(e) {
    e.preventDefault();
    const form = new FormData(e.target),
      data = {};
    
      for (let k of form.entries()) {
      data[k[0]] = k[1];
    }

    this.props.updateWorkspace({name: data["name"], id: data["id"]})
      .then(() => e.target.reset());
  }

  render() {
    const { workspaces } = this.props;
    return (<>
      <span id="admin-page-nav">
        <Link to="/admin/account"><h3>Account</h3></Link>
        <Link to="/admin/workspaces"><h3 ref={this.currentTabRef}>Workspaces</h3></Link>
      </span>

      <div id="admin-page-items-container">
        {Object.keys(workspaces).map(ws => (
          <AdminItem 
            key={ws}
            title={workspaces[ws].name}
            clickHandler={this.triggerCurrentWorkspace}
            content={<>

              <AdminItem 
                title={"Name"}
                content={<>
                <form 
                  onSubmit={this.submitHandler}
                  className="session-form">
                  <span>Current Password</span>
                  <input type="password" name="password" />
      
                  <span>New Workspace Name</span>
                  <input type="text" name="name" />

                  <input type="hidden" name="id" value={ws} />
      
                  <input type="submit" value="Update Name" />
                </form>
              </>} />

              <div className="admin-page-item-wrapper">
                <div className="admin-page-item">
                  <h2>Delete Workspace</h2>
                  <button onClick={() => this.props.deleteWorkspace(this.props.workspaces[ws])}>
                    Delete Workspace
                  </button>
                </div>
              </div>

            </>} 
          />
        ))}
      </div>
    </>)
  }
}

class AdminPage extends React.Component {
  render() {
    return (
      <div className="admin-page">
        <HeaderContainer className="front-page-header" />

        <Route exact path="/admin">
          <Redirect to="/admin/account" />
        </Route>
        
        <div className="admin-page-wrapper">
          <div className="admin-page-contents">
            <h1>Settings</h1>

            <Route path="/admin/account" render={() => <AccountAdmin user={this.props.user}/>} />

            <Route path="/admin/workspaces" render={() => 
              <WorkspacesAdmin 
                deleteWorkspace={this.props.deleteWorkspace}
                updateWorkspace={this.props.updateWorkspace}
                workspaces={this.props.workspaces}/>} 
            />

          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default AdminPage;