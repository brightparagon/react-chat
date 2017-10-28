import { all, call, put, fork, take, select } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import axios from 'axios';

function* addMessage() {
  while(true) {
    const { email, name, content } = yield take(types.ADD_MESSAGE_REQUEST);
    yield put({type: types.ADD_MESSAGE, email, name, content});
  }
}

function* rootMessageSaga() {
  yield all([
    fork(addMessage)
  ]);
}

export default rootMessageSaga;