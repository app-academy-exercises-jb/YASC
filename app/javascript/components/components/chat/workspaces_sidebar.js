import React from 'react';

class SideBar extends React.Component {
  render() {
    const { workspaces, setCurrentWorkspace, currentWorkspace } = this.props;
    if (currentWorkspace === undefined) return null;
    return (
      <div className="workspaces-sidebar">
        {Object.keys(workspaces).map((ws, idx) => (
          <div 
            key={ws}
            className="workspaces-icon"
            onClick={() => {setCurrentWorkspace(ws)}}
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
    )
  }
}

export default SideBar;