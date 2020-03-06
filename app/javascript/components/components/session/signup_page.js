import React from 'react';
import { Link, Route } from 'react-router-dom'
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import LoginFormContainer from './login_form_container'
import SignupFormContainer from './signup_form_container'
import FindTeamImg from 'images/find_team'

const SignupWrapper = () => {
  return (
    <div className="signup-wrapper">
      <h2>Let's get started</h2>
      
      <div id="signup-buttons" className="button-box" style={{flexDirection: "column"}}>
        <Link id="find-team" to="/signup/find">
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
    </div>
  )
}

class SignupPage extends React.Component {
  render() {
    return (
      <div className="front-page">
        <HeaderContainer className="front-page-header top-header" />

        <div className="session-wrapper">
          <div id="signup-page" className="session-content">
            <Route exact path="/signup" component={SignupWrapper} />

            <Route exact path="/signup/find" render={() => (
              <div className="signup-wrapper">
                <h2>Find your workspace</h2>
                <span>Log on and we'll find the existing workspaces you've joined.</span>
                <LoginFormContainer 
                  redirect={"/find"} 
                  pushHistory={this.props.history.push} 
                  explain={false} 
                />
              </div>
            )} />

            <Route path="/signup/create" render={() => (
              <div className="signup-wrapper">
                <h2>First, let's create your account</h2>
                <SignupFormContainer redirect={'/create'} pushHistory={this.props.history.push} />
              </div>
            )} />
          </div>
        </div>
        

        <Footer />
      </div>
    )
  }
}

export default SignupPage;