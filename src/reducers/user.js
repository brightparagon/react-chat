import * as types from '../actions/ActionTypes';

const initialState = {
  auth: {
    isSignedIn: false,
    signedUser: {
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
          signedUser: {
            ...action.signedUser
          }
        }
      }

    // SIGN OUT USER
    case types.SIGNOUT_USER:
      return {
        ...state,
        auth: {
          ...initialState.auth
        }
      }

    default:
      return state;
  }
}
