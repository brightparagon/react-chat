import { all, fork } from 'redux-saga/effects';
import rootMessageSaga from './messageSaga';

export default function* rootSaga() {
  yield all([
    fork(rootMessageSaga)
  ])
}