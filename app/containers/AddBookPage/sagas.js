import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { appUrl } from 'utils/constants';
import {
  SEARCH_REQUEST,
  SELECT_BOOK,
  UNSELECT_BOOK,
} from './constants';
import { searchSuccess, searchError } from './actions';

export function* searchSaga(action) {
  const requestUrl = `${appUrl}/api/search?searchTerm=${action.payload.searchTerm}`;
  try {
    const books = yield call(request, requestUrl);
    if (books.success) {
      yield put(searchSuccess({ books: books.data }));
    } else {
      yield put(searchError({ error: books.error }));
    }
  } catch (error) {
    yield put(searchError({ error }));
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
