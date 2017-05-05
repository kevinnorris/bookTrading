import { takeLatest, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { MY_BOOKS_REQUEST, REMOVE_BOOK_REQUEST } from './constants';
import { myBooksSuccess, myBooksError, removeBookSuccess, removeBookError } from './actions';

export function* myBooksSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const activePage = action.payload.activePage ? action.payload.activePage : 0;
  const requestUrl = `${appUrl}/api/books?myBooks=true&&token=${token}&&userId=${userId}&&activePage=${activePage}`;
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
  yield takeLatest(MY_BOOKS_REQUEST, myBooksSaga);
}

export function* removeBookSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    console.log('remove book saga');
    console.log(action.payload);
    const removedBook = yield call(request, `${appUrl}/api/removeBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, bookId: action.payload.bookId }),
    });
    if (removedBook.success) {
      yield put(removeBookSuccess({ bookId: action.payload.bookId }));
      // Set selected book to false (should close modal)
      // yield put(push('/mybooks'));
    } else {
      yield put(removeBookError({ error: removedBook.error }));
    }
  } catch (error) {
    yield put(removeBookError({ error: error.response }));
  }
}

export function* removeBookWatcher() {
  yield takeLatest(REMOVE_BOOK_REQUEST, removeBookSaga);
}

// All sagas to be loaded
export default [
  myBooksWatcher,
  removeBookWatcher,
];
