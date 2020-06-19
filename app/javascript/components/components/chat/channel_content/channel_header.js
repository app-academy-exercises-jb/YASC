import React, { useRef, useState, useEffect } from 'react'
import GearIcon from 'images/gear_icon'
import MemberCountIcon from 'images/member_count'

const ChannelHeader = ({
  currentChannel,
  currentChannels,
  currentWorkspace,
  deleteChannel,
  leaveChannel,
  getChannelCounts,
  removeJoinedChannel,
  setCurrentChannel,
  user
}) => {
  const dropdownRef = useRef();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);

  useEffect(() => {
    if (currentChannel) {
      if (!loadingCount && currentChannel.member_count === undefined) {
        getChannelCounts(currentChannel.id);
        setLoadingCount(true);
      } else {
        setLoadingCount(false);
      }
    }
  }, [currentChannel]);

  const chooseDefaultChannel = (id) => {
    let joinedChannels = currentChannels[currentWorkspace.id];

    if (currentChannel) {
      setCurrentChannel(currentChannel)
    } else if (joinedChannels.length === 1) {
      setCurrentChannel(joinedChannels[0]);
    } else if (id === joinedChannels[0]) {
      setCurrentChannel(joinedChannels[1]);
    } else {
      setCurrentChannel(joinedChannels[0])
    }
  }

  const showDropdown = () => {
    if (dropdownVisible) return;
    setDropdownVisible(true);
    document.addEventListener("click", hideDropdown);
  }

  const hideDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownVisible(false);
      document.removeEventListener("click", hideDropdown);
    }
  }

  if (!currentChannel) return null;
    
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
          <img src={GearIcon} onClick={showDropdown}/>

          {dropdownVisible && 
          <div id="options-dropdown" ref={dropdownRef}>
            <section>
              <span><div>Jump to date...</div></span>
              <span><div>Add people to channel</div></span>
              <span><div>View channel details</div></span>
            </section>
            <section>
              <span onClick={() => {
                leaveChannel(currentChannel)
                  .then(() => chooseDefaultChannel(currentChannel.id));
              }}><div>Leave channel</div></span>
              <span onClick={() => {
                deleteChannel(currentChannel)
                  .then(() => chooseDefaultChannel(currentChannel.id));
                removeJoinedChannel(currentChannel);
              }}><div>Delete channel</div></span>
            </section>
          </div>}
        </div>
      </div>


    </div>
  )

};

export default ChannelHeader;
