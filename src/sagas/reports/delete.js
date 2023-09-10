import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  DELETE_REPORT_LOADING,
  DELETE_REPORT_ERROR,
  DELETE_REPORT_RESET,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
} from "../../reducers/reports/constants";
import { reportsApi } from "../../api/reports";
import { listReportsRequestSaga } from "./read";
import { GET_REPORTS_LIST_REQUEST } from "../../reducers/reports/constants";

export function* deleteReportEmployeesRequestSaga(action) {
  try {
    yield put(loading(DELETE_REPORT_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(reportsApi.reports.delete, {
      ...payload,
    });
    if (response && response.success) {
      yield put(success(DELETE_REPORT_SUCCESS, response));
      yield* listReportsRequestSaga({
        type: GET_REPORTS_LIST_REQUEST,
      });

      yield delay(2000);
      yield put({ type: DELETE_REPORT_RESET });
    } else {
      yield put(error(DELETE_REPORT_ERROR, response));
      yield delay(2000);
      yield put({ type: DELETE_REPORT_RESET });
    }
  } catch (err) {
    yield put(error(DELETE_REPORT_ERROR, err));
    yield delay(2000);
    yield put({ type: DELETE_REPORT_RESET });
  }
}

export function* watchDeleteReportData() {
  yield takeLatest(
    DELETE_REPORT_REQUEST,
    deleteReportEmployeesRequestSaga
  );
}
