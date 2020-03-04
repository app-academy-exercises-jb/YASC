import React from 'react';
import HeaderContainer from './header_container'
import MainContent from './main_content';

class HomePage extends React.Component {

  render() {
    return (<div className="front-page">
      <HeaderContainer />
      <MainContent />
    </div>)
  }
}

export default HomePage;