import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { signedInUser } = this.props;

    return (
      <div>
        {
          this.props.isSignedIn ?
            <div>
              <h2>Signed!</h2>
              <button
                onClick={this.props.onSignOut}
              >
                Sign out
              </button>
              <h3>이름: {signedInUser.name}</h3>
              <h3>이메일: {signedInUser.email}</h3>
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default Header;
