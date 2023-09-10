import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  CREATE_REPORT_LOADING,
  CREATE_REPORT_ERROR,
  CREATE_REPORT_RESET,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
} from "../../reducers/reports/constants";
import { reportsApi } from "../../api/reports";
import { listReportsRequestSaga } from "./read";
import { GET_REPORTS_LIST_REQUEST } from "../../reducers/reports/constants";

export function* createReportEmployeesRequestSaga(action) {
  try {
    yield put(loading(CREATE_REPORT_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(reportsApi.reports.create, {
      ...payload,
    });
    if (response && response.success) {
      yield put(success(CREATE_REPORT_SUCCESS, response));
      yield* listReportsRequestSaga({
        type: GET_REPORTS_LIST_REQUEST,
      });

      yield delay(2000);
      yield put({ type: CREATE_REPORT_RESET });
    } else {
      yield put(error(CREATE_REPORT_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_REPORT_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_REPORT_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_REPORT_RESET });
  }
}

export function* watchCreateReportData() {
  yield takeLatest(
    CREATE_REPORT_REQUEST,
    createReportEmployeesRequestSaga
  );
}
