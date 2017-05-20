import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get: {
    world: {
      country: 'country',
      city: 'city',
      message: 'message'
    }
  }
};

export default function world(state = initialState, action) {
  switch(action.type) {
    // UPDATE STORE
    case types.GET_WORLD:
      return update(state, {
        get: {
          world: {$set: action.world}
        }
      });

    default:
      return state;
  }
}
