import React from 'react'
import SideBar from './sidebar'

class ChatPage extends React.Component {
  render() {
    return (
      <div className="chat-page">
        <SideBar />

        <div className="channel-content">

        </div>

        <div className="thread-content">
          
        </div>
      </div>
    )
  }
}

export default ChatPage;
