import React from 'react'
import BannerPoster from 'images/banner_poster'
import BannerVideo from 'images/banner_video'
import { Link } from 'react-router-dom'

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.demoLogin = this.demoLogin.bind(this);
  }
  
  demoLogin(e) {
    if (this.props.user) {
    } else {
      e.preventDefault();
      this.props.loginUser({ email: "demo@example.com", password: "abcd1234" })
        .then(res => {
          this.props.getWorkspaces(this.props.user);
        })
        .then(res => {
          this.props.history.push("/app/");
        })
    }

  }

  render() {
    return (
      <div className="banner">
        <video 
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          poster={BannerPoster}
          src={BannerVideo}
          type="video/mp4"
        ></video>

        <div className="banner-header">
          <header>
            yasc solves all your communication needs
          </header>
          <span>
            Keep your work flowing with yasc, the free alternative to Slack
          </span>
          <div className="button-box">
            <Link id="try-us" to="/signup">try yasc</Link>
            <Link onClick={this.demoLogin} id="demo" to="/app">see the demo</Link>
          </div>
          <p>
            Already using yasc? <Link to="/login">Log on</Link>.
          </p>
        </div>
      </div>
    )  
  }

};

export default Banner;