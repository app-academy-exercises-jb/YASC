import React from 'react';
import { Provider } from 'react-redux'
import { StaticRouter, BrowserRouter } from 'react-router-dom'
import configureStore from './store/store'
// import YASC from './components/yasc'

const Router = ({children, path}) => {
  try {
    // ExecJS throws an error as soon as it sees window or document
    // By checking window, we force the error and catch on the server
    // side with StaticRouter. client side still works with 
    // BrowserRouter
    window === undefined;
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    )
  } catch (error) {
    return (
      <StaticRouter location={path} context={{}}>
        {children}
      </StaticRouter>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getYasc = this.getYasc.bind(this);
    this.YASC = null;
  }

  componentDidMount() {
    this.getYasc();
    const preloadedState = { entities: {}, session: {} };

    if (window.currentUser) {
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

    preloadedState.session.isProduction = this.props.isProduction;
    this.store = configureStore(preloadedState);
    this.forceUpdate();
  }

  getYasc() {
    import('./components/yasc')
      .then(YASC => {
        this.YASC = <YASC.default />;
        this.forceUpdate();
      });
  }

  render() {
    if (!this.store) return null;

    return (
      <Provider store={this.store}>
        <Router>
          {this.YASC}
        </Router>
      </Provider>
    );
  }
}

export default App;