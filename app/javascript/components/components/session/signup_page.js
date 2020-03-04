import React from 'react';
import { Link, Route } from 'react-router-dom'
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import LoginFormContainer from './login_form_container'
import SignupFormContainer from './signup_form_container'

const SignupWrapper = () => {
  return (<>
      <h2>Let's get started</h2>
      
      <div id="signup-buttons" className="button-box" style={{flexDirection: "column"}}>
        <Link to="/signup/#/find">
          <h3>My team is using yasc</h3>
          <span>Find and sign in to your team's workspace</span>
        </Link>
        <Link to="/signup/create">
          <h3>My team isn't using yasc yet</h3>
          <span>Create a workspace for your team</span>
        </Link>
      </div>
  </>)
}

class SignupPage extends React.Component {
  render() {
    return (
      <div className="front-page">
        <HeaderContainer />

        <div className="session-wrapper">
          <div className="session-content">
            <div className="signup-page">
              <Route exact path="/signup" component={SignupWrapper} />
              <Route path="/signup/create" component={SignupFormContainer} />
              <Route path="/signup/find" component={LoginFormContainer} />
            </div>
          </div>
        </div>
        

        <Footer />
      </div>
    )
  }
}

export default SignupPage;