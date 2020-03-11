import React from 'react';
import ErrorComponent from '../session/error_wrapper'

class AddChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      channel_type: "public"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let val = e.target.name === "private" ? (e.target.checked ? "private" : "public") : e.target.value;
    let name = e.target.name === "private" ? "channel_type" : e.target.name;
    this.setState({ [name]: val });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentWorkspace, createNewChannel,
      clearChannelErrors, hideAddModal, hideModal} = this.props,
      channel = this.state;

    channel.workspace_id = currentWorkspace.id;
    createNewChannel(this.state)
      .then(res => {
        if (res.type !== "RECEIVE_CHANNEL_ERRORS") {
          clearChannelErrors();
          document.removeEventListener("click", hideAddModal);
          hideModal("Add");
        }
      })
  }

  render() {
    return (<>
      <form onSubmit={this.handleSubmit} className="session-form">
        <h3>Name</h3>
        <input
          type="text"
          placeholder="e.g. plan-budget"
          name="name"
          onChange={this.handleChange}
        />
        <div>#</div>

        <h3>
          Description
          <p>(optional)</p>
        </h3>
        <input type="text" placeholder="" name="description" onChange={this.handleChange} />
        <p>What's this channel about?</p>

        <span id="privacy">
          <div>
            <h3>Make private</h3>
            <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
          </div>
          <div id="toggle">
            <input type="checkbox" name="private" onChange={this.handleChange}/>
            <div id="toggle-visual"></div>
          </div>
        </span>

        <input type="submit" value="Create" />
      </form>
      <div id="create-channel-errors">
        <ErrorComponent errors={this.props.errors}/>
      </div>
    </>)
  }
}

export default AddChannelForm;