import React from 'react'
import ChannelHeaderContainer from './channel_header_container';

class ChannelContent extends React.Component {
  render() {
    return (
      <div className="channel-content">
        <ChannelHeaderContainer />

        <div id="channel-messages-wrapper">
          <div id="channel-messages-content">
            <div className="channel-message-item">
              
            </div>
          </div>
          <div id="text-editor-wrapper">
            <div id="text-editor-border">
              <textarea id="text-editor"></textarea>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChannelContent;
