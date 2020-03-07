import React from 'react';
import { Link } from 'react-router-dom';
import ErrorComponent from '../session/error_wrapper'
import AdminItem from './admin_item'

class AccountAdmin extends React.Component {
  constructor(props) {
    super(props)

    this.currentTabRef = React.createRef();
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.currentTabRef.current.id = "admin-nav-item-selected"
  }

  componentWillUnmount() {
    this.currentTabRef.current.id = ""
  }

  submitHandler(e, argsArr) {
    e.preventDefault();
    e.persist();

    const form = new FormData(e.target),
      data = {},
      formData = {};
    
    for (let k of form.entries()) {
      data[k[0]] = k[1];
    }

    for (let k of argsArr) {
      formData[k] = data[k];
    }

    this.props.updateUser(formData)
      .then((res) => {if (res.type !== "RECEIVE_SESSION_ERRORS") e.target.reset()});
  }

  render() {
    const { user, flushSessions, errors, clearErrors } = this.props;
    return (<>
      <span id="admin-page-nav">
        <Link to="/admin/account"><h3 ref={this.currentTabRef}>Account</h3></Link>
        <Link to="/admin/workspaces"><h3>Workspaces</h3></Link>
      </span>
      <div id="admin-page-items-container">

        <AdminItem 
          title={"Password"}
          onDismount={clearErrors}
          content={<>
          <form 
            className="session-form"
            onSubmit={e => this.submitHandler(e,["email", "password", "new_password", "id"])}>
            <span>Current Password</span>
            <input type="password" name="password"  />

            <span>New Password</span>
            <input type="password" name="new_password"  />

            <input type="hidden" name="id" value={user.id} />
            <input type="hidden" name="email" value={user.email} />

            <input type="submit" value="Save Password" />
          </form>
          <ErrorComponent errors={errors}/>
        </>} />

        <AdminItem user={user}
          title={"Email"}
          onDismount={clearErrors}
          content={<>
          <form 
            className="session-form"
            onSubmit={e => this.submitHandler(e,["password", "email", "new_email", "id"])}
          >
            <p>Your email address is {user.email || ""}</p>
            <span>Current Password</span>
            <input type="password" name="password"  />

            <span>New Email</span>
            <input type="text" name="new_email" />

            <input type="hidden" name="id" value={user.id} />
            <input type="hidden" name="email" value={user.email} />

            <input type="submit" value="Update Email" />
          </form>
          <ErrorComponent errors={errors}/>
        </>} />

        <div className="admin-page-item-wrapper">
          <div className="admin-page-item">
            <h2>Sign out all other sessions</h2>
            <button 
              onClick={() => flushSessions(user)} 
              style={{backgroundColor: "#de4e2b", color: "#fff", boxShadow: "none"}}
            >
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </>)
  }
}

export default AccountAdmin;