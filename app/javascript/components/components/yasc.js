import React from 'react'
import HomePage from './home_page/home_page'
import SignupPage from './session/signup_page'
import LoginPage from './session/login_page'
import CreatePageContainer from './workspaces/create_page_container'
import FindPageContainer from './workspaces/find_page_container'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from '../util/routes'

class YASC extends React.Component {
  render() {
    return (<>
      <Route exact path="/" component={HomePage} />
      <PublicRoute path="/login" component={LoginPage} />
      <PublicRoute path="/signup" component={SignupPage} />
      <ProtectedRoute path="/create" component={CreatePageContainer} />
      <ProtectedRoute path="/find" component={FindPageContainer} />
      <Redirect from="*" to="/" />
    </>)
  }
}

export default YASC;