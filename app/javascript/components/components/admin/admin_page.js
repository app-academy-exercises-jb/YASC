import React from 'react';
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import { Route, Redirect } from 'react-router-dom';
import AccountAdmin from './account_admin'
import WorkspacesAdmin from './workspaces_admin'

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

            <Route path="/admin/account" render={() => 
              <AccountAdmin 
                flushSessions={this.props.logoutOtherSessions}
                updateUser={this.props.updateUser}
                errors={this.props.userErrors}
                clearErrors={this.props.clearSessionErrors}
                user={this.props.user}/>} 
            />

            <Route path="/admin/workspaces" render={() => 
              <WorkspacesAdmin 
                user={this.props.user}
                deleteWorkspace={this.props.deleteWorkspace}
                updateWorkspace={this.props.updateWorkspace}
                clearErrors={this.props.clearWorkspaceErrors}
                errors={this.props.workspaceErrors}
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