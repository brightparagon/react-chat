import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';
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
    browserHistory.push('/signin');
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
    }
  }

  render() {
    return (
      <div className='App flex-container'>
        <div className='flex-item'>
          <h1>Hello App Component</h1>
          <Header
            isSignedIn={this.props.auth.isSignedIn}
            signedInUser={this.props.auth.user}
            onSignOut={this.handleSignOut}
          />
        </div>
        <div className='flex-item'>
          {React.cloneElement(this.props.children, {socket: socket})}
        </div>
      </div>
    );
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
