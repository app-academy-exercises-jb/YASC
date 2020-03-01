import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/store'
import YASC from './components/yasc'

let preloadedState = {}

if (window.currentUser) {
  preloadedState = {
    entities: {
      users: { [window.currentUser.id]: window.currentUser }
    },
    session: {
      currentUser: window.currentUser.id,
      sessionToken: window.currentUser.session_token
    }
  };
}
const store = configureStore(preloadedState);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <YASC />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;