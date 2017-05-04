import { takeLatest, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { MY_BOOKS_REQUEST } from './constants';
import { myBooksSuccess, myBooksError } from './actions';

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

// All sagas to be loaded
export default [
  myBooksWatcher,
];
