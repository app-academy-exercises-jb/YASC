import React from 'react';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.switchWorkspace = this.switchWorkspace.bind(this);
  }

  switchWorkspace(id) {
    this.props.setCurrentWorkspace(id);
    this.props.history.push(`/app/${id}`);
  }

  render() {
    const { workspaces, currentWorkspace } = this.props;
    if (currentWorkspace === undefined) return null;
    return (
      <div className="workspaces-sidebar">
        {Object.keys(workspaces).map((ws, idx) => (
          <div 
            key={ws}
            className="workspaces-icon"
            onClick={() => this.switchWorkspace(ws)}
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