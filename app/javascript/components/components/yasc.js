import React from 'react'
import HomePage from './home_page/home_page'
import SignupPage from './session/signup_page'
import LoginPage from './session/login_page'
import CreatePageContainer from './workspaces/create_page_container'
import FindPageContainer from './workspaces/find_page_container'
import AdminPageContainer from './admin/admin_page_container'
import ChatClientContainer from './chat/client_container'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from '../util/routes'

class YASC extends React.Component {
  render() {
    return (<>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/signup" component={SignupPage} />
        <ProtectedRoute path="/create" component={CreatePageContainer} />
        <ProtectedRoute path="/find" component={FindPageContainer} />
        <ProtectedRoute path="/admin" component={AdminPageContainer} />
        <ProtectedRoute path="/app" component={ChatClientContainer} />
        <Redirect from="*" to="/" />
      </Switch>
    </>)
  }
}

export default YASC;
