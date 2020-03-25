import React from 'react'
import ChatPageContainer from './chat_page_container'
import { Route, Redirect, Switch } from 'react-router-dom';
import { boot } from '../../util/workspaces_api';

class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.fetchChannels = this.fetchChannels.bind(this);
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