import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { unselectBook } from 'containers/App/actions';
import { MY_BOOKS_REQUEST, REMOVE_BOOK_REQUEST } from './constants';
import { myBooksSuccess, myBooksError, removeBookSuccess, removeBookError } from './actions';

export function* myBooksSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const activePage = action.payload.activePage ? action.payload.activePage : 0;
  const requestUrl = `${appUrl}/api/myBooks?token=${token}&&userId=${userId}&&activePage=${activePage}`;
  try {
    const response = yield call(request, requestUrl);
    if (response.success) {
      yield put(myBooksSuccess({ books: response.books, numPages: response.numPages }));
    } else {
      yield put(myBooksError({ error: response.error }));
    }
  } catch (error) {
    yield put(myBooksError({ error: error.response }));
  }
}

export function* myBooksWatcher() {
  const watcher = yield takeLatest(MY_BOOKS_REQUEST, myBooksSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* removeBookSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    const removedBook = yield call(request, `${appUrl}/api/removeBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, bookId: action.payload.bookId }),
    });
    if (removedBook.success) {
      yield put(unselectBook());  // Closes the modal
      yield put(removeBookSuccess({ bookId: action.payload.bookId }));
    } else {
      yield put(removeBookError({ error: removedBook.error }));
    }
  } catch (error) {
    yield put(removeBookError({ error: error.response }));
  }
}

export function* removeBookWatcher() {
  const watcher = yield takeLatest(REMOVE_BOOK_REQUEST, removeBookSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  myBooksWatcher,
  removeBookWatcher,
];
