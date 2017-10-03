import * as types from './ActionTypes';
import request from 'superagent';

export function sendMessageRequest() {
  return (dispatch) => {
    return request
      .get('/api/world/')
      .then((response) => {
        dispatch(getWorldSuccess(response.body.world));
      }, (error) => {
        console.log(error);
      });
  }
}

export function addMessage(email, name, message) {
  return {
    type: types.ADD_MESSAGE,
    email,
    name,
    message
  };
}
