import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';
import {
  Lobby, SignInPage
} from './containers';
import {
  Header
} from './components';
import {
  signIn
} from './actions/user';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('', {path: '/api/chat'})
    };
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem('user_email');
    window.sessionStorage.removeItem('user_name');
  }

  render() {
    const { redirectTo, socket } = this.state;

    return (
      <div className='App flex-container' key='App' >
        <div className='flex-item'>
          <h1>Hello App Component</h1>
          <Header
            socket={socket}
          />
        </div>
        <div className='flex-item'>
          <BrowserRouter>
            <Switch>
              <Route
                path='/signin'
                render={(props) =>
                  <SignInPage {...props} socket={socket} />
                }
              />
              <Route
                path='/'
                render={(props) =>
                  <Lobby {...props} socket={socket} signIn={this.props.signIn} />
                }
              />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (signedUser, isSignedIn) => {
      return dispatch(signIn(signedUser, isSignedIn))
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
