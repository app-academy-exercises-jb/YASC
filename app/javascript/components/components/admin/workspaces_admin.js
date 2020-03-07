import React from 'react';
import { Link } from 'react-router-dom';
import ErrorComponent from '../session/error_wrapper'
import AdminItem from './admin_item'

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

  render() {
    const { workspaces, user, errors, clearErrors, deleteWorkspace } = this.props;
    console.log(errors)
    console.log("those were it")
    return (<>
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
                <ErrorComponent errors={{workspace: errors[ws]}}/>
              </>} />

              <div className="admin-page-item-wrapper">
                <div className="admin-page-item">
                  <h2>Delete Workspace</h2>
                  <button onClick={() => deleteWorkspace(workspaces[ws])}>
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

export default WorkspacesAdmin;