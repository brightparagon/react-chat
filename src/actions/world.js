import {
  GET_WORLD
} from './ActionTypes';
import request from 'superagent';

/*
  DISPATCHER TO GET A WORLD
  * Can do AJAX call in dispatcher thanks to redux-thunk
  * Use HTTP Client as you want: superagent used here for example
*/
export function getWorldRequest() {
  return (dispatch) => {
    return request
      .get('/api/world')
      .then((response) => {
        dispatch(getWorldSuccess(response.body.world));
      }, (error) => {
        // Error Handling Here
        console.log(error);
      });
  }
}

export function getWorldSuccess(world) {
  return {
    type: GET_WORLD,
    world
  };
}
