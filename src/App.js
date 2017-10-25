import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
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

const socket = io('', {path: '/api/chat'});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: ''
    };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    window.sessionStorage.removeItem('user_email');
    window.sessionStorage.removeItem('user_name');
    const dataToSend = {
      email: this.props.auth.user.email,
      name: this.props.auth.user.name
    };
    socket.emit('signout', dataToSend);
    this.props.signOut();
    // browserHistory.push('/signin');
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem('user_email');
    window.sessionStorage.removeItem('user_name');
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('user_email')) {
      const isSignedIn = true;
      const signedUser = {
        email: window.sessionStorage.getItem('user_email'),
        name: window.sessionStorage.getItem('user_name'),
      };
      this.props.signIn(signedUser, isSignedIn);
    } else {
      this.setState({
        redirectTo: '/signin'
      });
    }
  }

  render() {
    const { redirectTo } = this.state;

    return [
      redirectTo !== '' ? <Redirect key='redirect' to={redirectTo} push /> : null,
      <div className='App flex-container' key='app' >
        <div className='flex-item'>
          <h1>Hello App Component</h1>
          <Header
            isSignedIn={this.props.auth.isSignedIn}
            signedInUser={this.props.auth.user}
            onSignOut={this.handleSignOut}
          />
        </div>
        <div className='flex-item'>
          <Switch>
            <Route path='/signin' rebder={(props) => (<SignInPage {...props} socket={socket} />)} />
            <Route path='/' render={(props) => (<Lobby {...props} socket={socket} />)} />
          </Switch>
        </div>
      </div>
    ];
  }
}
// <Redirect to='/signin' push />
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
