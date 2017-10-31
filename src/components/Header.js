import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  signOut
} from '../actions/user';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    const { socket } = this.state;

    window.sessionStorage.removeItem('user_email');
    window.sessionStorage.removeItem('user_name');
    const dataToSend = {
      email: this.props.auth.signedUser.email,
      name: this.props.auth.signedUser.name
    };
    socket.emit('signout', dataToSend);
    this.props.signOut();
    this.history.push('/');
  }

  render() {
    const { auth } = this.props;

    return (
      <div>
        {
          auth.isSignedIn ?
            <div>
              <h2>Signed!</h2>
              <button
                onClick={this.handleSignOut}
              >
                Sign out
              </button>
              <h3>이름: {auth.signedUser.name}</h3>
              <h3>이메일: {auth.signedUser.email}</h3>
            </div>
            :
            null
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
