import React from 'react'
import GearIcon from 'images/gear_icon'
import MemberCountIcon from 'images/member_count'

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false
    }

    this.dropdownRef = React.createRef();
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
    this.chooseDefaultChannel = this.chooseDefaultChannel.bind(this);
  }

  chooseDefaultChannel(id) {
    const { setCurrentChannel, currentChannels } = this.props;

    if (currentChannels.length === 1) {
      setCurrentChannel(currentChannels[0]);
    } else if (id === currentChannels[0]) {
      setCurrentChannel(currentChannels[1]);
    } else {
      setCurrentChannel(currentChannels[0])
    }
  }

  deleteChannel(e) {
    const { deleteChannel, currentChannel, removeJoinedChannel } = this.props;
    deleteChannel(currentChannel)
      .then(res => {debugger; this.chooseDefaultChannel(currentChannel.id)});
    removeJoinedChannel(currentChannel.id);
  }

  leaveChannel() {
    const { leaveChannel, currentChannel } = this.props;
    leaveChannel(currentChannel.id)
      .then(res => this.chooseDefaultChannel(currentChannel.id));
  }

  showDropdown() {
    if (this.state.dropdownVisible) return;
    this.setState({dropdownVisible: true});
    document.addEventListener("click", this.hideDropdown);
  }

  hideDropdown(e) {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(e.target)) {
      this.setState({dropdownVisible: false});
      document.removeEventListener("click", this.hideDropdown);
    }
  }

  render() {
    const { currentChannel, currentChannels, getChannelCounts } = this.props;
    if (!currentChannel) return null;
    if (currentChannel.member_count === undefined && 
      currentChannels.findIndex(el => el === currentChannel.id) !== -1) {
        getChannelCounts(currentChannel.id);
      }
    
    return (
      <div id="channel-content-header">

        <div className="channel-header-info">
          <div id="channel-header-title">
            {currentChannel.name}
          </div>
          <div id="channel-header-details">
            <div id="channel-member-count">
              <img src={MemberCountIcon} />
              {currentChannel["member_count"] || 0}
            </div>
            <div id="channel-topic">
              {currentChannel.topic}
            </div>
          </div>
        </div>

        <div className="channel-header-tools">
          <div id="options-icon">
            <img src={GearIcon} onClick={this.showDropdown}/>
            {this.state.dropdownVisible && 
            <div id="options-dropdown" ref={this.dropdownRef}>
              <section>
                <span><div>Jump to date...</div></span>
                <span><div>Add people to channel</div></span>
                <span><div>View channel details</div></span>
              </section>
              <section>
                <span onClick={this.leaveChannel}><div>Leave channel</div></span>
                <span onClick={this.deleteChannel}><div>Delete channel</div></span>
              </section>
            </div>}
          </div>
        </div>


      </div>
    )
  }
}

export default ChannelHeader;
