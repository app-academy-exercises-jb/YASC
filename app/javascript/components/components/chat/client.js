import React from 'react'
import SideBar from './sidebar'

class ChatClient extends React.Component {
  componentDidMount() {
    const { user, workspaces, currentWorkspace, setCurrentWorkspace, getWorkspaces } = this.props;

    //ensure there are workspaces, ensure there is a current workspace
    if (Object.keys(workspaces).length === 0) {
      getWorkspaces(user)
        .then(function(res) {
          if (res.type !== "RECEIVE_WORKSPACE_ERRORS") {
            setCurrentWorkspace(res.workspaces[0].id);
          }
        });
    } else if (!currentWorkspace) {
      const firstWorkspace = workspaces[Object.keys(workspaces)[0]];
      setCurrentWorkspace(firstWorkspace.id);
    }
  }

  render() {
    // /app should redirect to /app/:id
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

export default ChatClient;