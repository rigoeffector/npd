/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  CREATE_SITE_LOADING,
  CREATE_SITE_ERROR,
  CREATE_SITE_RESET,
  CREATE_SITE_REQUEST,
  CREATE_SITE_SUCCESS,
  GET_SITES_LIST_REQUEST,
} from "../../reducers/sites/constants";
import { sitesApi } from "../../api/sites";
import { getSitesRequestSaga } from "./read";

export function* createSiteRequestSaga(action) {
  try {
    yield put(loading(CREATE_SITE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(sitesApi.sites.create, { ...payload });
    if (response && response.success) {
      yield put(success(CREATE_SITE_SUCCESS, response));
      yield* getSitesRequestSaga({
        type: GET_SITES_LIST_REQUEST,
      });
      yield delay(2000);
      yield put({ type: CREATE_SITE_RESET });
    } else {
      yield put(error(CREATE_SITE_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_SITE_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_SITE_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_SITE_RESET });
  }
}

export function* watchCreateSiteData() {
  yield takeLatest(CREATE_SITE_REQUEST, createSiteRequestSaga);
}
