import React from 'react';
import ErrorComponent from '../../session/error_wrapper'

class InviteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let val = e.target.value,
      name = e.target.name;

    this.setState({ [name]: val });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.persist();
    this.props.inviteMember({
      id: this.props.currentWorkspace.id,
      user: this.state
    })
      .then(res => {
        if (res.type !== "RECEIVE_USER_ERRORS") {
          this.props.hideModal();
        }
      })
  }

  render() {
    return (<>
      <form onSubmit={this.handleSubmit} className="session-form">
        <span>
          <div>
            <h3>Email</h3>
            <input
              type="text"
              placeholder="name@example.com"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h3>
              Name (optional)
            </h3>
            <input type="text" placeholder="Optional" name="name" onChange={this.handleChange} />
          </div>
        </span>
        

        <input type="submit" value="Send Invitation" />
      </form>
      <div id="create-channel-errors">
        <ErrorComponent errors={this.props.errors}/>
      </div>
    </>)
  }
}

export default InviteForm;