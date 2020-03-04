import React from 'react'
import BannerPoster from 'images/banner_poster'
import BannerVideo from 'images/banner_video'
import { Link } from 'react-router-dom'

const Banner = (props) => {
  return (
    <div className="banner">
        <video 
          autoPlay={true}
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
            <Link id="demo" to="/">see the demo</Link>
          </div>
          <p>
            Already using yasc? <Link to="/login">Log on</Link>.
          </p>
        </div>
      </div>
  )
};

export default Banner;