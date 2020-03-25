import React from 'react';
import HeaderContainer from './header_container'
import MainContent from './main_content';
import Footer from './footer'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (<div className="front-page">
      <HeaderContainer className="front-page-header" />
      <MainContent history={this.props.history} />
      <Footer />
    </div>)
  }
}

export default HomePage;