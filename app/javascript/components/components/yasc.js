import React from 'react'
import HomePage from './home_page/home_page'
import SignupPage from './session/signup_page'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from '../util/routes'
import LoginPage from './session/login_page'

class YASC extends React.Component {
  render() {
    return (<>
      <Route exact path="/" component={HomePage} />
      <PublicRoute path="/login" component={LoginPage} />
      <PublicRoute path="/signup" component={SignupPage} />
      <Redirect from="*" to="/" />
    </>)
  }
}

export default YASC;