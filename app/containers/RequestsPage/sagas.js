import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import {
  GET_REQUESTS_REQUEST,
  ACCEPT_REQUEST_REQUEST,
  CANCEL_REQUEST_REQUEST,
  COMPLETE_REQUEST_REQUEST,
} from './constants';
import {
  getRequestsSuccess,
  getRequestsError,
  acceptRequestSuccess,
  acceptRequestError,
  cancelRequestSuccess,
  cancelRequestError,
  completeRequestSuccess,
  completeRequestError,
} from './actions';

export function* requestsSaga() {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const requestUrl = `${appUrl}/api/requests?token=${token}&&userId=${userId}`;
  try {
    const response = yield call(request, requestUrl);
    if (response.success) {
      yield put(getRequestsSuccess({ requests: response.requests }));
    } else {
      yield put(getRequestsError({ error: response.error }));
    }
  } catch (error) {
    yield put(getRequestsError({ error: error.response }));
  }
}

export function* requestsWatcher() {
  const watcher = yield takeLatest(GET_REQUESTS_REQUEST, requestsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* acceptRequestSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    const response = yield call(request, `${appUrl}/api/acceptRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, requestId: action.payload.requestId }),
    });
    if (response.success) {
      yield put(acceptRequestSuccess({ bookId: action.payload.requestId }));
    } else {
      yield put(acceptRequestError({ error: response.error }));
    }
  } catch (error) {
    yield put(acceptRequestError({ error: error.response }));
  }
}

export function* acceptRequestWatcher() {
  const watcher = yield takeLatest(ACCEPT_REQUEST_REQUEST, acceptRequestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* cancelRequestSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    const response = yield call(request, `${appUrl}/api/cancelRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, requestId: action.payload.requestId }),
    });
    if (response.success) {
      yield put(completeRequestSuccess({ bookId: action.payload.requestId }));
    } else {
      yield put(cancelRequestError({ error: response.error }));
    }
  } catch (error) {
    yield put(cancelRequestError({ error: error.response }));
  }
}

export function* cancelRequestWatcher() {
  const watcher = yield takeLatest(CANCEL_REQUEST_REQUEST, cancelRequestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* completeRequestSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    const response = yield call(request, `${appUrl}/api/completeRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, requestId: action.payload.requestId }),
    });
    if (response.success) {
      yield put(cancelRequestSuccess({ bookId: action.payload.requestId }));
    } else {
      yield put(completeRequestError({ error: response.error }));
    }
  } catch (error) {
    yield put(completeRequestError({ error: error.response }));
  }
}

export function* completeRequestWatcher() {
  const watcher = yield takeLatest(COMPLETE_REQUEST_REQUEST, completeRequestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  requestsWatcher,
  acceptRequestWatcher,
  cancelRequestWatcher,
  completeRequestWatcher,
];
