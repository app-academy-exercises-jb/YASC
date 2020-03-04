import React from 'react';
import HeaderContainer from './header_container'
import MainContent from './main_content';
import Footer from './footer'

class HomePage extends React.Component {

  render() {
    return (<div className="front-page">
      <HeaderContainer />
      <MainContent />
      <Footer />
    </div>)
  }
}

export default HomePage;