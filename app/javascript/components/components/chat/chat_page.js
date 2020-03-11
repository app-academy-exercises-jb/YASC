import React from 'react';
import SideBar from './sidebar/sidebar';
import ChannelContent from './channel_content/channel_content';

class ChatPage extends React.Component {
  render() {
    return (
      <div className="chat-page">
        <SideBar />

        <ChannelContent />

        <div className="thread-content">
          
        </div>
      </div>
    )
  }
}

export default ChatPage;
