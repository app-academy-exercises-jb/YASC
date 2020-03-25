import React from 'react';

class ChannelsList extends React.Component {
  render() {
    return (
      <div id="channels-list">
        <h3>
          Channels
          <div id="channels-tooltip-container">
            <div id="channels-tooltip">Browse all channels</div>
            <div id="channels-tooltip-tail"></div>
          </div>
        </h3>

        <span><span className="plus-sign">+</span> Add a channel</span>
      </div>
    )
  }
}

export default ChannelsList;