import React from 'react'
import workspaceLogo from 'images/default_workspace_icons/1'

class ChatClient extends React.Component {
  componentDidMount() {
    //ensure there are workspaces, ensure there is a current workspace
  }
  
  render() {
    const { workspaces, currentWorkspace } = this.props;
    //please make the below spaghetti into easy to read react components, like in the frontend-auth structure we wrote
    return (
      <div className="chat-page">
        <div className="chat-sidebar">

          <div className="workspaces-sidebar">
            {Object.keys(workspaces).map((ws, idx) => (
              <div 
                key={ws}
                className="workspaces-icon"
                onClick={() => {this.props.setCurrentWorkspace(ws)}}
              >
                <img 
                  className={ws == currentWorkspace.id ? "workspaces-sidebar-active" : ""} 
                  src={require(`images/default_workspace_icons/${idx}`)} 
                />
                <div className="tooltip-container">
                  <div className="tooltip-tail" />
                  <span className="tooltip-content">
                    {workspaces[ws].name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="main-sidebar">

          </div>
        </div>
        <div className="channel-content">

        </div>
        <div className="thread-content">
          
        </div>
      </div>
    )
  }
}

export default ChatClient;