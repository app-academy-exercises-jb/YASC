import React from 'react';
import HeaderContainer from '../home_page/header_container'
import CreateWorkspace from 'images/create-workspace'
import { Route } from 'react-router-dom';
import ErrorComponent from '../session/error_wrapper';

class CreatePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      channel: ""
    }

    this.getChannel = this.getChannel.bind(this);
    this.tada = this.tada.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.triggerTada = this.triggerTada.bind(this)
  }

  componentWillUnmount() {
    this.props.clearWorkspaceErrors();
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getChannel(e) {
    e.preventDefault();
    this.props.clearWorkspaceErrors();
    this.props.createNewWorkspace({name: this.state.name})
      .then(res => {
        if (res.type !== "RECEIVE_WORKSPACE_ERRORS") {
          this.props.setCurrentWorkspace(res.workspace.id);
          this.props.history.push('/create/channelname');
        }
      });
  }

  triggerTada(e) {
    e.preventDefault();
    this.props.history.push('/create/tada')
  }

  tada(e) {
    e.preventDefault();
    this.props.history.push('/app')
  }

  render() {
    return (
      <div className="create-page">
      <HeaderContainer className="front-page-header top-header create-page-header" />

      <Route exact path="/create" render={() => (
        <div className="create-panel create-panel-left">
          <form onSubmit={this.getChannel} className="session-form">

            <h2>What's the name of your company or team?</h2>
            <input 
              type="text"
              name="name"
              placeholder="Acme Marketing"
              onChange={this.handleInput}
            />
            <input type="submit" value="Next" />

          </form>

          <ErrorComponent errors={this.props.errors} />
        </div>
      )} />

      <Route path="/create/channelname" render={() => (
        <div className="create-panel create-panel-left">
          <form onSubmit={this.triggerTada} className="session-form">

            <h2>What's a project your team is working on?</h2>
            <input 
              type="text"
              name="channel"
              placeholder="Q4 Budget"
              onChange={this.handleInput}
            />
            <input type="submit" value="Create Team" />

          </form>
        </div>
      )} />

      <Route path="/create/tada" render={() => (
        <div className="create-panel create-panel-left">
          <form onSubmit={this.tada} className="session-form">

            <h2>Tada! Meet your team's first channel: #{this.state.channel}</h2>
            <input type="submit" value="See Your Channel in YASC" />

          </form>
        </div>
      )} />

      <div className="create-panel create-panel-right">
        <img src={CreateWorkspace} />
      </div>
        
      </div>
    )
  }
}

export default CreatePage;