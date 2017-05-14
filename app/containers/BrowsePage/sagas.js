import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { unselectBook } from 'containers/App/actions';
import { removeBookWatcher } from 'containers/MyBooksPage/sagas';
import { ALL_BOOKS_REQUEST, REQUEST_BOOK } from './constants';
import { allBooksSuccess, allBooksError, requestBookSuccess, requestBookError } from './actions';

export function* allBooksSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const activePage = action.payload.activePage ? action.payload.activePage : 0;
  // Build request URL based on if user is authenticated
  let requestUrl = `${appUrl}/api/allBooks?`;
  if (token && userId) {
    requestUrl += `token=${token}&&userId=${userId}&&`;
  }
  requestUrl += `activepage=${activePage}`;

  try {
    const response = yield call(request, requestUrl);
    if (response.success) {
      yield put(allBooksSuccess({ books: response.books, numPages: response.numPages }));
    } else {
      yield put(allBooksError({ error: response.error }));
    }
  } catch (error) {
    yield put(allBooksError({ error: error.response }));
  }
}

export function* allBooksWatcher() {
  const watcher = yield takeLatest(ALL_BOOKS_REQUEST, allBooksSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* requestBookSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    const response = yield call(request, `${appUrl}/api/requestBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        userId,
        bookId: action.payload.bookId,
        bookOwner: action.payload.bookOwner,
        title: action.payload.title,
      }),
    });
    if (response.success) {
      yield put(unselectBook());  // Closes the modal
      yield put(requestBookSuccess({ bookId: action.payload.bookId }));
    } else {
      yield put(requestBookError({ error: response.error }));
    }
  } catch (error) {
    yield put(requestBookError({ error: error.response }));
  }
}

export function* requestBookWatcher() {
  const watcher = yield takeLatest(REQUEST_BOOK, requestBookSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  allBooksWatcher,
  requestBookWatcher,
  removeBookWatcher,
];
