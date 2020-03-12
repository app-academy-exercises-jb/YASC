import React from 'react'
import ChannelHeaderContainer from './channel_header_container';
import ChannelMessagesContainer from './channel_messages_container'

class ChannelContent extends React.Component {
  render() {
    return (
      <div className="channel-content">
        <ChannelHeaderContainer />
        <ChannelMessagesContainer />
      </div>
    )
  }
}

export default ChannelContent;
