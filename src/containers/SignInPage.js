import React from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {
  signIn
} from '../actions/user';
import '../css/components.css';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignInFailure = this.onSignInFailure.bind(this);
  }

  onSignIn(response) {
    const profile = response.profileObj;
    const signedUser = {
      id: profile.googleId,
      name: profile.name,
      imageUrl: profile.imageUrl,
      email: profile.email
    };
    const isSignedIn = true;
    window.sessionStorage.setItem('user_email', profile.email);
    window.sessionStorage.setItem('user_name', profile.name);
    this.props.signIn(signedUser, isSignedIn);
    this.props.socket.emit('signin', signedUser);
    // browserHistory.push('/');
  }

  onSignInFailure(response) {
    console.error(response);
  }

  render() {
    return (
      <div className='flex-page'>
        <div className='flex-page-item'>
          <h1>Sign-in Page</h1>
        </div>
        <div className='flex-page-item'>
          <GoogleLogin
            clientId='878636458520-psjdh0jj6etvfbu9mdhp1le1478h6jrk.apps.googleusercontent.com'
            buttonText='Sign In with Google'
            onSuccess={this.onSignIn}
            onFailure={this.onSignInFailure}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (signedUser, isSignedIn) => {
      return dispatch(signIn(signedUser, isSignedIn))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
