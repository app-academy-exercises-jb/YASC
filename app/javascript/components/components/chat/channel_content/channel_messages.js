import React, { useRef, useEffect, useState } from 'react'
import DefaultUserImg from 'images/default_user';

const ChannelMessages = ({
  createNewMessage,
  getMessages,
  currentChannel,
  currentWorkspace,
  messages,
  users,
  user
}) => {
  const inputRef = useRef(),
    chatBoxRef = useRef();

  const [channelMessages, setChannelMessages] = useState([]);

  useEffect(() => {
    let chatBox = chatBoxRef.current;
    if (!chatBox) return;
    chatBox.scroll({
      top: chatBox.scrollHeight,
      behavior: "auto"
    });
  }, [chatBoxRef.current]);

  useEffect(() => {
    if (currentChannel && messages) {
      if (!messages[currentChannel.id]) {
        getMessages(currentChannel);
      } else {
        setChannelMessages(messages[currentChannel.id]);
      }
    }
  }, [messages, currentChannel]);

  const inputHandler = (e) => {
    if (e.target.value === "") return;
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      const body = e.target.value,
        channel_id = e.target.name;

      e.target.value = "";
      
      createNewMessage({ 
        body,
        channel_id
      });
    }
  };

  return (
    <div id="channel-messages-wrapper">

      <div ref={chatBoxRef} id="channel-messages-content">
      {channelMessages.map(m => (
          <div key={m.id} className="channel-message-wrapper">
            <div className="channel-message-item">
              <div className="message-icon">
                <img src={DefaultUserImg} />
              </div>
              <div className="message-content-wrapper">
                <span className="message-header">
                  <p className="user-id">{users[m.author_id] && users[m.author_id].email}</p>
                  <p className="message-time">
                    {new Date(Date.parse(m.created_at)).toLocaleTimeString()}
                  </p>
                </span>
                <span className="message-content">
                  {m.body}
                </span>
              </div>
            </div>
          </div>
      ))}
      </div>


      <div id="text-editor-wrapper">
        <div id="text-editor-border">
          <textarea 
            id="text-editor"
            ref={inputRef}
            onKeyDown={inputHandler}
            name={currentChannel && currentChannel.id}
          />
        </div>
      </div>
    </div>
  )
};

// class ChannelMessages extends React.Component {

//   componentDidMount() {
//     // gimme a document event listener on keydown so we can capture input
//   }

//   componentWillUnmount() {
//     // remove above event listener
//   }

  
export default ChannelMessages;
