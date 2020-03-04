import React from 'react'
import YoutubeVid from 'images/channels_video'
import YoutubeModal from './youtube_modal'
import BannerContainer from './banner_container'

class MainContent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      youtubeModal: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    e && e.preventDefault();
    this.setState({youtubeModal: !this.state.youtubeModal});
  }

  render() {
    return (<main>
      <BannerContainer />

      <div className="break-the-inbox">
        <h2>Break out of the inbox</h2>
        <p>Working in channels gives everyone on the team a shared view of progress and purpose.</p>

        <a href="https://www.youtube.com/embed/EYqxQGmQkVw" onClick={this.toggleModal}>
          <video autoPlay={true} loop={true} src={YoutubeVid} type="video/mp4"></video>
          <svg xmlns="http://www.w3.org/2000/svg" height="60" width="84">
            <g fill="none" transform="translate(0 .564)">
              <rect height="59" rx="4" width="84"></rect>
              <path d="M49 29.95L35 36.9V23L49 29.95Z" fill="#fff"></path>
            </g>
          </svg>
        </a>
      </div>

      <YoutubeModal 
        pauseVideo={() => {this.toggleModal()}}
        play={this.state.youtubeModal}  
      />
    </main>)
  }
}

export default MainContent;