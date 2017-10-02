import * as types from './ActionTypes';
import request from 'superagent';

export function signIn(signedUser, isSignedIn) {
  return {
    type: types.SIGNIN_USER,
    signedUser,
    isSignedIn
  };
}

export function signOut() {
  return {
    type: types.SIGNOUT_USER
  };
}
