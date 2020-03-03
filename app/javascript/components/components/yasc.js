import React from 'react'
import HomePage from './home_page/home_page'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from '../util/routes'

class YASC extends React.Component {
  render() {
    return (<>
      <Route exact path="/" component={HomePage} />
      <PublicRoute path="/login" component={LoginFormContainer} />
      <PublicRoute path="/signup" component={SignupFormContainer} />
      <Redirect from="*" to="/" />
    </>)
  }
}

export default YASC;