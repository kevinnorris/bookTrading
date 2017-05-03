import { takeLatest, call, select, put } from 'redux-saga/effects';
import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import {
  SEARCH_REQUEST,
} from './constants';
import { searchSuccess, searchError } from './actions';

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
  const watcher = yield [
    takeLatest(SEARCH_REQUEST, searchSaga),
  ];
}

// All sagas to be loaded
export default [
  searchData,
];
