import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  UPDATE_REPORT_LOADING,
  UPDATE_REPORT_ERROR,
  UPDATE_REPORT_RESET,
  UPDATE_REPORT_REQUEST,
  UPDATE_REPORT_SUCCESS,
} from "../../reducers/reports/constants";
import { reportsApi } from "../../api/reports";
import { listReportsRequestSaga } from "./read";
import { GET_REPORTS_LIST_REQUEST } from "../../reducers/reports/constants";

export function* updateReportEmployeesRequestSaga(action) {
  try {
    yield put(loading(UPDATE_REPORT_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(reportsApi.reports.update, {
      ...payload,
    });
    if (response && response.success) {
      yield put(success(UPDATE_REPORT_SUCCESS, response));
      yield* listReportsRequestSaga({
        type: GET_REPORTS_LIST_REQUEST,
      });

      yield delay(2000);
      yield put({ type: UPDATE_REPORT_RESET });
    } else {
      yield put(error(UPDATE_REPORT_ERROR, response));
      yield delay(2000);
      yield put({ type: UPDATE_REPORT_RESET });
    }
  } catch (err) {
    yield put(error(UPDATE_REPORT_ERROR, err));
    yield delay(2000);
    yield put({ type: UPDATE_REPORT_RESET });
  }
}

export function* watchUpdateReportData() {
  yield takeLatest(
    UPDATE_REPORT_REQUEST,
    updateReportEmployeesRequestSaga
  );
}
