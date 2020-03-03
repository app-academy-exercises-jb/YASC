import React from 'react'

class YoutubeModal extends React.Component {
  constructor(props) {
    super(props)

    this.ExitModal = this.ExitModal.bind(this);
    this.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }

  ExitModal() {
    this.props.pauseVideo();
    document.getElementById("youtube-modal").className = ""
    this.player.pauseVideo();
  }

  componentDidMount() {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";

      window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      this.onYouTubeIframeAPIReady();
    }
  }

  onYouTubeIframeAPIReady() {
    this.player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'EYqxQGmQkVw',
      fs: 1,
      autoplay: 1,
      events: {
        'onReady': this.onPlayerReady
      }
    });
  }

  onPlayerReady(e) {
  }

  render() {
    if (this.props.play) {
      document.getElementById("youtube-modal").className = "active"
      this.player.playVideo();
    }
    return (
      <div id="youtube-modal" onClick={this.ExitModal}>
        <button>
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="-255 347 100 100" aria-hidden="true"><path d="M-160.4 434.2l-37.2-37.2 37.1-37.1-7-7-37.1 37.1-37.1-37.1-7 7 37.1 37.1-37.2 37.2 7.1 7 37.1-37.2 37.2 37.2"></path>
          </svg>esc
        </button>
        <div id="player"></div>
      </div>
    )
  }
}

export default YoutubeModal;