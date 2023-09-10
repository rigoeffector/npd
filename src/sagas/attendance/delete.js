import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  DELETE_ATTENDANCE_LOADING,
  DELETE_ATTENDANCE_ERROR,
  DELETE_ATTENDANCE_RESET,
  DELETE_ATTENDANCE_REQUEST,
  DELETE_ATTENDANCE_SUCCESS,
} from "../../reducers/attendance/constants";
import { attendanceApi } from "../../api/attendance";
import { listAttendancesRequestSaga } from "./read";
import { GET_ATTENDANCES_LIST_REQUEST } from "../../reducers/attendance/constants";

export function* deleteAttendanceEmployeesRequestSaga(action) {
  try {
    yield put(loading(DELETE_ATTENDANCE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(attendanceApi.attendance.delete, {
      ...payload,
    });
    if (response && response.success) {
      yield put(success(DELETE_ATTENDANCE_SUCCESS, response));
      yield* listAttendancesRequestSaga({
        type: GET_ATTENDANCES_LIST_REQUEST,
      });

      yield delay(2000);
      yield put({ type: DELETE_ATTENDANCE_RESET });
    } else {
      yield put(error(DELETE_ATTENDANCE_ERROR, response));
      yield delay(2000);
      yield put({ type: DELETE_ATTENDANCE_RESET });
    }
  } catch (err) {
    yield put(error(DELETE_ATTENDANCE_ERROR, err));
    yield delay(2000);
    yield put({ type: DELETE_ATTENDANCE_RESET });
  }
}

export function* watchDeleteAttendanceEmployeeData() {
  yield takeLatest(
    DELETE_ATTENDANCE_REQUEST,
    deleteAttendanceEmployeesRequestSaga
  );
}
