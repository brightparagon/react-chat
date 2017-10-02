import React from 'react';
import { connect } from 'react-redux';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      imageURL: '',
      email: ''
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    this.setState({
      id: profile.getId(),
      name: profile.getName(),
      imageURL: profile.getImageUrl(),
      email: profile.getEmail()
    });
  }

  componentDidMount() {
    window.onload = () => {
      gapi.auth2.init({
        client_id: '878636458520-psjdh0jj6etvfbu9mdhp1le1478h6jrk.apps.googleusercontent.com.apps.googleusercontent.com',
        scope: 'profile, email',
      });
      gapi.signin2.render('g-signin2', {
        // 'scope': 'https://www.googleapis.com/auth/plus.login',
        // 'scope': 'profile, email',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn
      });
    }
  }

  render() {
    const { id, name, email } = this.state;

    return (
      <div>
        <h1>Sign-in Page</h1>
        <br/>
        <h3>ID: {id}</h3>
        <h3>Name: {name}</h3>
        <h3>Email: {email}</h3>
        <div id='g-signin2' ></div>
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
