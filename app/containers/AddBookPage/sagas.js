import { takeLatest, call, select, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import {
  SEARCH_REQUEST,
  ADD_BOOK_REQUEST,
} from './constants';
import {
  searchSuccess,
  searchError,
  addBookSuccess,
  addBookError,
} from './actions';

export function* searchSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const requestUrl = `${appUrl}/api/search?searchTerm=${action.payload.searchTerm}&&token=${token}&&userId=${userId}`;
  try {
    const books = yield call(request, requestUrl);
    if (books.success) {
      yield put(searchSuccess({ books: books.data }));
    } else {
      yield put(searchError({ error: books.error }));
    }
  } catch (error) {
    yield put(searchError({ error: error.response }));
  }
}

export function* searchData() {
  yield takeLatest(SEARCH_REQUEST, searchSaga);
}

export function* addBookSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    console.log(action.payload);
    const bookAdded = yield call(request, `${appUrl}/api/addBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, googleData: action.payload.book }),
    });
    if (bookAdded.success) {
      yield put(addBookSuccess());
      yield put(push('/mybooks'));
    } else {
      yield put(addBookError({ error: bookAdded.error }));
    }
  } catch (error) {
    yield put(addBookError({ error: error.response }));
  }
}

export function* addBookWatcher() {
  yield takeLatest(ADD_BOOK_REQUEST, addBookSaga);
}

// All sagas to be loaded
export default [
  searchData,
  addBookWatcher,
];
