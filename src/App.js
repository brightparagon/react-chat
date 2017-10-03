import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  Header
} from './components';
import {
  signOut
} from './actions/user';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   socket: ''
    // };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.signOut();
    window.sessionStorage.removeItem('user_email');
    browserHistory.push('/signin');
  }

  componentDidMount() {
    const { auth } = this.props;
    // let {socket} = this.state;
    // socket = io();

    // if (!auth.isSignedIn) {
    //   browserHistory.push('/signin');
    // }
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem('user_email');
  }

  render() {
    return (
      <div className='flex-container'>
        <div className='flex-item'>
          <h1>Hello App Component</h1>
          <Header
            isSignedIn={this.props.auth.isSignedIn}
            signedInUser={this.props.auth.user}
            onSignOut={this.handleSignOut}
          />
        </div>
        <div className='flex-item'>
          {this.props.children}
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
    signOut: () => {
      return dispatch(signOut())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
