import {
  GET_WORLD
} from './ActionTypes';
import request from 'superagent';

export function sendMessageRequest() {
  return (dispatch) => {
    return request
      .get('/api/world/')
      .then((response) => {
        dispatch(getWorldSuccess(response.body.world));
      }, (error) => {
        // Error Handling Here
        console.log(error);
      });
  }
}

export function sendMessageSuccess(world) {
  return {
    type: GET_WORLD,
    world
  };
}
