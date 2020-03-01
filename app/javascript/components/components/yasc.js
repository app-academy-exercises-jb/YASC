import React from 'react'
import GreetingContainer from './home_page/greeting_container'
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import { Route, Link } from 'react-router-dom'

class YASC extends React.Component {
  render() {
    const style = {
      display: "flex",
      flexDirection: "column"
    }

    return (<div style={style}>
      <h1><Link to="/">YASC</Link></h1>
      <GreetingContainer />
      <Route path="/login" component={LoginFormContainer} />
      <Route path="/signup" component={SignupFormContainer} />
    </div>)
  }
}

export default YASC;