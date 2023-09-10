/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  GET_REPORTS_LIST_LOADING,
  GET_REPORTS_LIST_ERROR,
  GET_REPORTS_LIST_RESET,
  GET_REPORTS_LIST_REQUEST,
  GET_REPORTS_LIST_SUCCESS,
} from "../../reducers/reports/constants";

import { reportsApi } from "../../api/reports";

export function* listReportsRequestSaga(action) {
  try {
    yield put(loading(GET_REPORTS_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(reportsApi.reports.readAll);
    if (response && response.success) {
      yield put(success(GET_REPORTS_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_REPORTS_LIST_ERROR, response));
    }
  } catch (err) {
    yield put(error(GET_REPORTS_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_REPORTS_LIST_RESET });
  }
}

export function* watchListReportsData() {
  yield takeLatest(GET_REPORTS_LIST_REQUEST, listReportsRequestSaga);
}
