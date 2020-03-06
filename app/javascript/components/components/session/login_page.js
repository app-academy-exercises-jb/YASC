import React from 'react';
import { Link, Route } from 'react-router-dom'
import HeaderContainer from '../home_page/header_container'
import Footer from '../home_page/footer'
import LoginFormContainer from './login_form_container'

class LoginPage extends React.Component {
  render() {
    return (
      <div className="front-page">
        <HeaderContainer className="front-page-header" />

        <div className="session-wrapper">
          <div id="login-page" className="session-content">
            <h2>Sign in to your workspace</h2>
            <LoginFormContainer explain={true}/>
          </div>
        </div>
        

        <Footer />
      </div>
    )
  }
}

export default LoginPage;