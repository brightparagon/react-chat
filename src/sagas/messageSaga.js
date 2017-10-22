import { all, call, put, fork, take, select } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import axios from 'axios';

function* AddMessage() {
  while(true) {
    yield take(types.ADD_MESSAGE_REQUEST);
  }
}

function* rootMessageSaga() {
  yield all([

  ]);
}

export default rootMessageSaga;