import React from 'react';
import SideBarHeader from './sidebar_header';
import ChannelsList from '../channels/channels_list';
import DirectMessagesList from './direct_messages_list';
import ThreadsImg from 'images/threads.png';

class SideBarDetail extends React.Component {
  render() {
    const { channels, workspaces, user, logoutUser, currentWorkspace,
      setCurrentChannel, getChannelCounts, joinChannel, joinedChannels } = this.props;
    if (currentWorkspace === undefined) return null;
    let iconId = Object.keys(workspaces).findIndex(k => k == currentWorkspace.id);
    
    return (
      <div className="sidebar-detail">
        <SideBarHeader
          user={user}
          currentWorkspace={currentWorkspace}
          iconId={iconId}
          logoutUser={logoutUser}
        />

        <div className="sidebar-threads">
          <img src={ThreadsImg} />
          <h3>Threads</h3>
        </div>
        
        <ChannelsList
          channels={channels}
          setCurrentChannel={setCurrentChannel}
          getChannelCounts={getChannelCounts}
          joinChannel={joinChannel}
          joinedChannels={joinedChannels}
          currentWorkspace={currentWorkspace}
        />

        <DirectMessagesList />
      </div>
    )
  }
}

export default SideBarDetail;
