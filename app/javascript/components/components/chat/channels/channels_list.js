import React from 'react';
import ChannelsListModal from './channels_list_modal';
import AddChannelModal from './add_channel_modal';

class ChannelsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChannelsModal: false,
      showAddModal: false
    }

    this.displayModal = this.displayModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideAddModal = this.hideAddModal.bind(this);
    this.channelsTooltip = this.channelsTooltip.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
    this.addChannelRef = React.createRef();
  }

  hideModal(modal) {
    const key = `show${modal}Modal`;
    this.setState({[key]: false});
  }

  hideAddModal(e) {
    if (this.modalRef.ref.current && !this.modalRef.ref.current.contains(e.target)) {
      this.hideModal("Add");
      document.removeEventListener("click", this.hideAddModal);
    }
  }

  displayModal(modal,e) {
    if (e && this.addChannelRef.current && this.addChannelRef.current.contains(e.target)) return;
    const key = `show${modal}Modal`;
    this.setState({[key]: true});
  }

  channelsTooltip(content) {
    return (
      <div className="channels-tooltip-container">
        <div id="channels-tooltip">{content}</div>
        <div id="channels-tooltip-tail"></div>
      </div>
    )
  }

  changeChannel(e,id) {
    this.props.setCurrentChannel(id);
    this.props.getChannelCounts(id);
  }

  render() {
    const { channels, joinChannel, setCurrentChannel, 
      joinedChannels, getChannelCounts, currentWorkspace } = this.props;

    if (Object.keys(joinedChannels).length === 0) return null;

    return (<>
      <div id="channels-list">
        <div id="channels-list-header" onClick={(e) => this.displayModal("Channels",e)}>
          <h3>
            Channels {this.channelsTooltip("Browse all channels")}
          </h3>
          <h3
            ref={this.addChannelRef}
            className="plus-sign"
            onClick={() => {
              this.displayModal("Add");
              document.addEventListener("click", this.hideAddModal);
            }}
          >
            + {this.channelsTooltip("Create a channel")}
          </h3>
        </div>

        {joinedChannels[currentWorkspace.id] && (
          joinedChannels[currentWorkspace.id].every(i => Object.keys(channels).includes(i.toString(10))) && (
            joinedChannels[currentWorkspace.id].map(ws => (
              <span key={ws} onClick={(e) => this.changeChannel(e,ws)}>
                # <div>{channels[ws].name}</div>
              </span>
            ))
          )
        )}

        <span onClick={() => this.displayModal("Channels")}>
          <span>+ Add a channel</span>
        </span>
      </div>

      {this.state.showChannelsModal && 
        <ChannelsListModal
          channels={channels}
          hideModal={this.hideModal}
          displayModal={this.displayModal}
          hideAddModal={this.hideAddModal}
          joinChannel={joinChannel}
          setCurrentChannel={setCurrentChannel}
          getChannelCounts={getChannelCounts}
        />
      }

      {this.state.showAddModal && 
        <AddChannelModal
          hideModal={this.hideModal}
          hideAddModal={this.hideAddModal}
          ref={ref => this.modalRef = ref}
        />
      }
    </>)
  }
}

export default ChannelsList;