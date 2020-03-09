import React from 'react';
import WorkspacesSidebarContainer from './workspaces_sidebar_container'
import SidebarDetailContainer from './sidebar_detail_container'

function SideBar() {
  return (
    <div className="chat-sidebar">
      <WorkspacesSidebarContainer />
      <SidebarDetailContainer />
    </div>
  )
}

export default SideBar;