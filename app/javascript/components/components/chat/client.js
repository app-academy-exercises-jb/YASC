import React from 'react'
import ChatPageContainer from './chat_page_container'
import { Route, Redirect, Switch } from 'react-router-dom';
import consumer from '../../../channels/consumer'

class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.fetchChannels = this.fetchChannels.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  receiveMessage(data) {
    this.props.receiveMessage(data.message);
  }

  fetchChannels(id, firstWsId) {
    const { setCurrentWorkspace, bootClient } = this.props;
    id ? setCurrentWorkspace(id) : setCurrentWorkspace(firstWsId);
    bootClient(id || firstWsId);
  }

  componentDidMount() {
    const { 
      user, match: { params: {id} }, bootClient,
      workspaces, currentWorkspace, getWorkspaces } = this.props;

    if (Object.keys(workspaces).length === 0) {
      getWorkspaces(user)
        .then((function(res) {
          if (res.type !== "RECEIVE_WORKSPACE_ERRORS" && !this.props.currentWorkspace) {
            this.fetchChannels(id, res.workspaces[0].id);
          }
        }).bind(this));
    } else if (!currentWorkspace) {
      let firstWorkspace = workspaces[Object.keys(workspaces)[0]];
      this.fetchChannels(id, firstWorkspace.id);
    } else {
      bootClient(currentWorkspace.id);
    }

    const socket = consumer.subscriptions.create("UserChannel", {
      connected() {},
      disconnected() {},
      received: this.receiveMessage
    });
    this.setState({socket});
  }

  render() {
    const { currentWorkspace } = this.props;
    return (
      <Switch>
        <Route path={`/app/:id`} component={ChatPageContainer} />
        <Route exact path="/app">
          {currentWorkspace && <Redirect from="/app" to={`/app/${currentWorkspace.id}`} />}
        </Route>
      </Switch>
    )
  }
}

export default ChatClient;