import React from 'react'
import GearIcon from 'images/gear_icon'
import MemberCountIcon from 'images/member_count'

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    
    this.dropdownRef = React.createRef();
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
    this.chooseDefaultChannel = this.chooseDefaultChannel.bind(this);

    this.state = {
      dropdownVisible: false,
      currentChannel: this.props.currentChannel,
      hideDropdown: this.hideDropdown
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.currentChannel !== nextProps.currentChannel) {
      document.removeEventListener("click", prevState.hideDropdown);
      return {
        dropdownVisible: false,
        currentChannel: nextProps.currentChannel
      };
    }
    return prevState;
  }

  chooseDefaultChannel(id) {
    let { setCurrentChannel, currentChannels, currentWorkspace } = this.props;
    currentChannels = currentChannels[currentWorkspace.id];

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
      .then(res => this.chooseDefaultChannel(currentChannel.id));
    removeJoinedChannel(currentChannel);
  }

  leaveChannel() {
    const { leaveChannel, currentChannel } = this.props;
    leaveChannel(currentChannel)
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
    const { currentChannel, currentChannels, getChannelCounts, currentWorkspace } = this.props;
    
    if (!currentChannel || 
      !currentWorkspace || 
      Object.keys(currentChannels).length === 0) return null;

    if (currentChannel.member_count === undefined && 
      currentChannels[currentWorkspace.id].findIndex(el => el === currentChannel.id) !== -1) {
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
              {currentChannel["member_count"] || ""}
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
