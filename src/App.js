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
  signIn,
  signOut
} from './actions/user';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('', {path: '/api/chat'}),
      redirectTo: ''
    };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    const { socket } = this.state;

    window.sessionStorage.removeItem('user_email');
    window.sessionStorage.removeItem('user_name');
    const dataToSend = {
      email: this.props.auth.user.email,
      name: this.props.auth.user.name
    };
    socket.emit('signout', dataToSend);
    this.props.signOut();
    this.setState({
      redirectTo: '/signin'
    });
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem('user_email');
    window.sessionStorage.removeItem('user_name');
  }

  render() {
    const { redirectTo, socket } = this.state;

    return [
      redirectTo !== '' ? <Redirect to={redirectTo} push key='Redirect' /> : null,
      <div className='App flex-container' key='App' >
        <div className='flex-item'>
          <h1>Hello App Component</h1>
          <Header
            isSignedIn={this.props.auth.isSignedIn}
            signedInUser={this.props.auth.user}
            onSignOut={this.handleSignOut}
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
    ];
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (signedUser, isSignedIn) => {
      return dispatch(signIn(signedUser, isSignedIn))
    },
    signOut: () => {
      return dispatch(signOut())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
