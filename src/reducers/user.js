import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  auth: {
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      imageUrl: '',
      email: ''
    }
  }
};

export default function user(state = initialState, action) {
  switch(action.type) {
    // SIGN IN USER
    case types.SIGNIN_USER:
      return update(state, {
        auth: {
          isSignedIn: {$set: action.isSignedIn},
          user: {$set: action.signedUser}
        }
      });

    // SIGN OUT USER
    case types.SIGNOUT_USER:
      return update(state, {
        auth: {
          isSignedIn: {$set: initialState.auth.isSignedIn},
          user: {$set: initialState.auth.user}
        }
      });
    default:
      return state;
  }
}
