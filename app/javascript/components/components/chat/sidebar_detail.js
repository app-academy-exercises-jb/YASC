import React from 'react';
import ThreadsImg from 'images/threads.png';
import SideBarHeader from './sidebar_header';
import ChannelsList from './channels_list';
import DirectMessagesList from './direct_messages_list';

class SideBarDetail extends React.Component {
  render() {
    const { workspaces, user, logoutUser, currentWorkspace } = this.props;
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
        
        <ChannelsList />

        <DirectMessagesList />
      </div>
    )
  }
}

export default SideBarDetail;
