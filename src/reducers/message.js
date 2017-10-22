import * as types from '../actions/ActionTypes';

const initialState = {
  messages: []  // array of objects { email, name, message }
};

export default function message(state = initialState, action) {
  switch(action.type) {
    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            email: action.email,
            name: action.name,
            message: action.message
          }
        ]
      };

    default:
      return state;
  }
}
