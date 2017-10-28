import * as types from '../actions/ActionTypes';

const initialState = {
  messages: []  // array of objects { email, name, content }
};

export default function message(state = initialState, action) {
  switch(action.type) {
    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            // email, name, content
            ...action
          }
        ]
      };

    default:
      return state;
  }
}
