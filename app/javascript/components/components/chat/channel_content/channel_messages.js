import React from 'react'

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }

    this.inputRef = React.createRef();
    this.inputHandler = this.inputHandler.bind(this);
  }

  componentDidMount() {
    // gimme a document event listener on keydown so we can capture input
  }

  componentWillUnmount() {
    // remove above event listener
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentChannel, messages, getMessages } = nextProps;
    if (!currentChannel || !messages) return null;
    if (!messages[currentChannel.id]) {
      getMessages(currentChannel);
      return null;
    } else {
      return { messages: messages[currentChannel.id] }
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
     { currentChannel } = this.props;
    return (
      <div id="channel-messages-wrapper">

        {messages && messages.map(m => (
          <div key={m.id} id="channel-messages-content">
            <div className="channel-message-item">
              {m.body}
            </div>
          </div>
        ))}


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
