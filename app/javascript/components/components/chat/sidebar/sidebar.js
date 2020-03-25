import React from 'react';
import WorkspacesSidebarContainer from './workspaces_sidebar_container'
import SidebarDetailContainer from './sidebar_detail_container'
import { useHistory } from 'react-router-dom';

function SideBar() {
  const history = useHistory();
  return (
    <div className="chat-sidebar">
      <WorkspacesSidebarContainer history={history}/>
      <SidebarDetailContainer />
    </div>
  )
}

export default SideBar;