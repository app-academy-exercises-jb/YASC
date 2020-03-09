import React from 'react';

class DirectMessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.dmsTooltip = this.dmsTooltip.bind(this);
  }

  dmsTooltip() {
    return (
      <div id="dms-tooltip-container">
        <div id="dms-tooltip">Open a direct message</div>
        <div id="dms-tooltip-tail"></div>
      </div>
    )
  }

  render() {
    return (
      <div className="direct-messages-list">
        <div id="direct-messages-header">
          <h3>
            Direct Messages {this.dmsTooltip()}
          </h3>
          <h3 className="plus-sign">
            + {this.dmsTooltip()}
          </h3>
        </div>
      </div>
    )
  }
}

export default DirectMessagesList;