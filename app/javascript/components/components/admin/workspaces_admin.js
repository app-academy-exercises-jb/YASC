import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import ErrorComponent from '../session/error_wrapper'
import AdminItem from './admin_item'

class WorkspacesAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentWorkspace: null
    }

    this.currentTabRef = React.createRef();
    // this is for expanding particular workspaces
    this.triggerCurrentWorkspace = this.triggerCurrentWorkspace.bind(this);
    // this is for setting which workspace to delete
    this.setCurrentWorkspace = this.setCurrentWorkspace.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  triggerCurrentWorkspace(e) {
    e.current.id = e.current.id === "" ? 
      "current-workspace" :
      "";
  }

  setCurrentWorkspace(ws) {
    this.setState({currentWorkspace: ws});
  }

  componentDidMount() {
    if (this.currentTabRef.current) this.currentTabRef.current.id = "admin-nav-item-selected";
  }

  componentWillUnmount() {
    if (this.currentTabRef.current) this.currentTabRef.current.id = "";
    this.props.clearErrors();
  }

  submitHandler(e) {
    e.preventDefault();
    e.persist();

    const form = new FormData(e.target),
      data = {};
    
      for (let k of form.entries()) {
      data[k[0]] = k[1];
    }

    this.props.updateWorkspace({name: data["name"], id: data["id"]})
      .then((res) => {if (res.type !== "RECEIVE_WORKSPACE_ERRORS") e.target.reset()});
  }

  deleteHandler(e) {
    e.preventDefault();
    this.props.deleteWorkspace(this.state.currentWorkspace)

    this.props.history.goBack();
  }

  render() {
    const { workspaces, user, errors, clearErrors } = this.props;
    return (
      <Switch>
        <Route exact path='/admin/workspaces' render={() => (<>
          <span id="admin-page-nav">
            <Link to="/admin/account"><h3>Account</h3></Link>
            <Link to="/admin/workspaces"><h3 ref={this.currentTabRef}>Workspaces</h3></Link>
          </span>

          <div id="admin-page-items-container">
            {Object.keys(workspaces).map(ws => ( workspaces[ws].owner_id == user.id && 
              <AdminItem 
                key={ws}
                onDismount={clearErrors}
                title={workspaces[ws].name}
                clickHandler={this.triggerCurrentWorkspace}
                content={<>

                  <AdminItem 
                    title={"Name"}
                    onDismount={clearErrors}
                    content={<>
                    <form onSubmit={this.submitHandler} className="session-form">
                      <span>New Workspace Name</span>
                      <input type="text" name="name" />

                      <input type="hidden" name="id" value={ws} />
          
                      <input type="submit" value="Update Name" />
                    </form>
                    <ErrorComponent
                      errors={errors}
                      errorClass="workspace"
                      errorType="name"
                      errorId={ws}
                    />
                  </>} />

                  <div className="admin-page-item-wrapper">
                    <div className="admin-page-item">
                      <h2>Delete Workspace</h2>
                      <Link to="/admin/workspaces/delete" onClick={() => this.setCurrentWorkspace(workspaces[ws])}>
                        Delete Workspace
                      </Link>
                    </div>
                  </div>

                </>} 
              />
            ))}
          </div>
        </>)}/>
        <Route path="/admin/workspaces/delete" render={(props) => {
          if (this.state.currentWorkspace) {
            return (<>
              <h1>You are deleting {this.state.currentWorkspace.name}</h1>
              <form id="confirmation" onSubmit={this.deleteHandler} className="session-form">
                <h2>Confirm Deletion</h2>

                <span>
                  I understand all of my data will be irretrievably lost.
                </span>

                <input type="submit" value="Yes, delete my workspace" />
              </form>
            </>)
          } else {
            return <Redirect to="/admin/workspaces" />
          }
        }} />
      </Switch>
    )
  }
}

export default WorkspacesAdmin;