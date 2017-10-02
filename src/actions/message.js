import {
  GET_MESSAGE
} from './ActionTypes';
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

export function sendMessageSuccess(world) {
  return {
    type: GET_MESSAGE,
    world
  };
}
