import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  message: []
};

export default function message(state = initialState, action) {
  switch(action.type) {
    // UPDATE STORE
    case types.GET_MESSAGE:
      return update(state, {
        message: {$push: action.message}
      });

    default:
      return state;
  }
}
