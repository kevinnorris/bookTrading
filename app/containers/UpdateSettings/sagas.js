import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { UPDATE_SETTINGS_REQUEST } from 'containers/App/constants';
import { updateSettingsSuccess, updateSettingsError } from 'containers/App/actions';

export function* updateSettingsSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  try {
    const updateSettings = yield call(request, `${appUrl}/api/updateSettings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        userId,
        name: action.payload.name,
        country: action.payload.country,
        city: action.payload.city,
        zip: action.payload.zip,
      }),
    });
    if (updateSettings.success) {
      // Payload used by App saga to update user info in App reducer
      yield put(updateSettingsSuccess({
        name: action.payload.name,
        country: action.payload.country,
        city: action.payload.city,
        zip: action.payload.zip,
      }));
      yield put(push('/dashboard'));
    } else {
      yield put(updateSettingsError({ error: updateSettings.error }));
    }
  } catch (error) {
    yield put(updateSettingsError({ error: error.response }));
  }
}

export function* updateSettingsWatcher() {
  const watcher = yield takeLatest(UPDATE_SETTINGS_REQUEST, updateSettingsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  updateSettingsWatcher,
];
