import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { unselectBook } from 'containers/App/actions';
import { WISHLIST_BOOKS_REQUEST, REMOVE_REQUEST_REQUEST } from './constants';
import { wishlistBooksSuccess, wishlistBooksError, removeRequestSuccess, removeRequestError } from './actions';

export function* wishlistBooksSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const activePage = action.payload.activePage ? action.payload.activePage : 0;
  const requestUrl = `${appUrl}/api/wishlist?token=${token}&&userId=${userId}&&activePage=${activePage}`;
  try {
    const response = yield call(request, requestUrl);
    if (response.success) {
      yield put(wishlistBooksSuccess({ books: response.books, numPages: response.numPages }));
    } else {
      yield put(wishlistBooksError({ error: response.error }));
    }
  } catch (error) {
    yield put(wishlistBooksError({ error: error.response }));
  }
}

export function* wishlistBooksWatcher() {
  const watcher = yield takeLatest(WISHLIST_BOOKS_REQUEST, wishlistBooksSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* removeRequestSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    const removedRequest = yield call(request, `${appUrl}/api/removeRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, bookId: action.payload.bookId }),
    });
    if (removedRequest.success) {
      yield put(unselectBook());  // Closes the modal
      yield put(removeRequestSuccess({ bookId: action.payload.bookId }));
    } else {
      yield put(removeRequestError({ error: removedRequest.error }));
    }
  } catch (error) {
    yield put(removeRequestError({ error: error.response }));
  }
}

export function* removeRequestWatcher() {
  const watcher = yield takeLatest(REMOVE_REQUEST_REQUEST, removeRequestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  wishlistBooksWatcher,
  removeRequestWatcher,
];
