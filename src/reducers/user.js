import * as types from '../actions/ActionTypes';

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
      return {
        ...state,
        auth: {
          ...state.auth,
          isSignedIn: action.isSignedIn,
          user: action.signedUser
        }
      }

    // SIGN OUT USER
    case types.SIGNOUT_USER:
      return {
        ...state,
        auth: {
          ...state.auth,
          isSignedIn: initialState.auth.isSignedIn,
          user: initialState.auth.user
        }
      }

    default:
      return state;
  }
}
