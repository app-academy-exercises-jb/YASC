import React from 'react'
import BannerPoster from 'images/banner_poster'
import BannerVideo from 'images/banner_video'
import { Link } from 'react-router-dom'

class MainContent extends React.Component {
  render() {
    return (<main>
      <div className="banner">
        <video autoplay="true" loop="true" poster={BannerPoster}>
          <source src={BannerVideo} type="video/mp4" />
        </video>
        <div className="banner-header">
          <header>
            yasc solves your communication needs
          </header>
          <span>
            Keep your work flowing with yasc, the free alternative to Slack
          </span>
          <div className="button-box">
            <Link id="try-us" to="/signup">try yasc</Link>
            <Link id="demo">see the demo</Link>
          </div>
          <p>
            Already using yasc? <Link to="/login">Log on</Link>.
          </p>
        </div>
      </div>
      <div className="content">

      </div>
    </main>)
  }
}

export default MainContent;