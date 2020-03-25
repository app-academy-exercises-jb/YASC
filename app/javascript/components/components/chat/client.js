import React from 'react'
import ChatPageContainer from './chat_page_container'
import { Route, Redirect, Switch } from 'react-router-dom';

class ChatClient extends React.Component {
  componentDidMount() {
    const { 
      history, user, match: { url}, location: { pathname },
      workspaces, currentWorkspace,
      setCurrentWorkspace, getWorkspaces } = this.props;

    //ensure there are workspaces, ensure there is a current workspace
    if (Object.keys(workspaces).length === 0) {
      if (pathname === "/app") {
        getWorkspaces(user)
          .then((function(res) {
            if (res.type !== "RECEIVE_WORKSPACE_ERRORS" && !this.props.currentWorkspace) {
              setCurrentWorkspace(res.workspaces[0].id);
            }
          }).bind(this));
      }
    } else if (!currentWorkspace) {
      const firstWorkspace = workspaces[Object.keys(workspaces)[0]];
      setCurrentWorkspace(firstWorkspace.id);
      history.push(url + `/${firstWorkspace.id}`)
    }
  }

  render() {
    // /app should redirect to /app/:id
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