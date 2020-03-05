import React from 'react';
import { Link, Route } from 'react-router-dom'
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import LoginFormContainer from './login_form_container'
import SignupFormContainer from './signup_form_container'
import FindTeamImg from 'images/find_team'

const SignupWrapper = () => {
  return (<div className="signup-wrapper">
      <h2>Let's get started</h2>
      
      <div id="signup-buttons" className="button-box" style={{flexDirection: "column"}}>
        <Link id="find-team" to="#">
          <div>
            <h3>My team is on yasc</h3>
            <span>Find and sign in to your team's workspace</span>
          </div>
          <img src={FindTeamImg}></img>
        </Link>
        <Link id="create-team" to="/signup/create">
          <h3>My team isn't using yasc yet</h3>
          <span>Create a workspace for your team</span>
        </Link>
      </div>
  </div>)
}

class SignupPage extends React.Component {
  render() {
    return (
      <div className="front-page">
        <HeaderContainer className="front-page-header top-header" />

        <div className="session-wrapper">
          <div className="session-content">
            <div className="signup-page">
              <Route exact path="/signup" component={SignupWrapper} />

              <Route path="/signup/create" render={() => (
                <>
                  <h2>Start using yasc today</h2>
                  <SignupFormContainer />
                </>
              )} />

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