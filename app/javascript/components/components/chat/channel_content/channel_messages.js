import React from 'react'
import DefaultUserImg from 'images/default_user';

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentChannel: null,
      loading: false
    }

    this.inputRef = React.createRef();
    this.chatBoxRef = React.createRef();
    this.inputHandler = this.inputHandler.bind(this);
  }

  componentDidMount() {
    // gimme a document event listener on keydown so we can capture input
  }

  componentWillUnmount() {
    // remove above event listener
  }

  componentDidUpdate(prevProps, prevState) {
    let ref = this.chatBoxRef.current;
    if (!ref) return;
    ref.scroll({
      top: ref.scrollHeight,
      behavior: this.state.loading ? "auto" : "smooth"});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentChannel, messages, getMessages } = nextProps;
    if (!currentChannel || !messages) return null;
    if (!messages[currentChannel.id]) {
      getMessages(currentChannel);
      return null;
    } else {
      const state = { 
        messages: messages[currentChannel.id],
        currentChannel: nextProps.currentChannel.id
      }
      if (prevState.currentChannel !== nextProps.currentChannel.id) {
        state.loading = true;
      } else {
        state.loading = false;
      }
      return state;
    }
  }

  inputHandler(e) {
    if (e.target.value === "") return;
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      const body = e.target.value,
        channel_id = e.target.name;

      e.target.value = "";
      
      this.props.createNewMessage({ 
        body,
        channel_id
      });
    }
  }

  render() {
    const { messages } = this.state,
      { currentChannel, users } = this.props;
    
    return (
      <div id="channel-messages-wrapper">

        <div ref={this.chatBoxRef} id="channel-messages-content">
        {messages && messages.map(m => (
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
              ref={this.inputRef}
              onKeyDown={this.inputHandler}
              name={currentChannel && currentChannel.id}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChannelMessages;
