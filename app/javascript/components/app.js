import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/store'
import YASC from './components/yasc'


class App extends React.Component {
  constructor(props) {
    super(props)
    const preloadedState = { entities: {}, session: {} }

    if (window && window.currentUser) {
      preloadedState.entities = {
        users: { [window.currentUser.id]: window.currentUser }
      };
      preloadedState.session = {
        currentUser: window.currentUser.id,
        currentWorkspace: null,
        currentChannel: null,
        sessionToken: window.currentUser.session_token
      };
    }

    preloadedState.session.isProduction = props.isProduction;

    this.store = configureStore(preloadedState);
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <YASC />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;