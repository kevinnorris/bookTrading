import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { USER_STATS_REQUEST } from 'containers/App/constants';
import { userStatsSuccess, userStatsError } from 'containers/App/actions';

export function* userStatsSaga() {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const requestUrl = `${appUrl}/api/userStats?token=${token}&&userId=${userId}`;
  try {
    const response = yield call(request, requestUrl);
    if (response.success) {
      yield put(userStatsSuccess(response.userStats));
    } else {
      yield put(userStatsError({ error: response.error }));
    }
  } catch (error) {
    yield put(userStatsError({ error: error.response }));
  }
}

export function* userStatsWatcher() {
  const watcher = yield takeLatest(USER_STATS_REQUEST, userStatsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  userStatsWatcher,
];
