/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  GET_ATTENDANCES_LIST_LOADING,
  GET_ATTENDANCES_LIST_ERROR,
  GET_ATTENDANCES_LIST_RESET,
  GET_ATTENDANCES_LIST_REQUEST,
  GET_ATTENDANCES_LIST_SUCCESS,
} from "../../reducers/attendance/constants";

import { attendanceApi } from "../../api/attendance";

export function* listAttendancesRequestSaga(action) {
  try {
    yield put(loading(GET_ATTENDANCES_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(attendanceApi.attendance.readAll);
    if (response && response.success) {
      yield put(success(GET_ATTENDANCES_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_ATTENDANCES_LIST_ERROR, response));
    }
  } catch (err) {
    yield put(error(GET_ATTENDANCES_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_ATTENDANCES_LIST_RESET });
  }
}

export function* watchListAttendancesData() {
  yield takeLatest(GET_ATTENDANCES_LIST_REQUEST, listAttendancesRequestSaga);
}
