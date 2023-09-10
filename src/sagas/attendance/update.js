import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  UPDATE_ATTENDANCE_LOADING,
  UPDATE_ATTENDANCE_ERROR,
  UPDATE_ATTENDANCE_RESET,
  UPDATE_ATTENDANCE_REQUEST,
  UPDATE_ATTENDANCE_SUCCESS,
} from "../../reducers/attendance/constants";
import { attendanceApi } from "../../api/attendance";
import { listAttendancesRequestSaga } from "./read";
import { GET_ATTENDANCES_LIST_REQUEST } from "../../reducers/attendance/constants";

export function* updateAttendanceEmployeesRequestSaga(action) {
  try {
    yield put(loading(UPDATE_ATTENDANCE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(attendanceApi.attendance.update, {
      ...payload,
    });
    if (response && response.success) {
      yield put(success(UPDATE_ATTENDANCE_SUCCESS, response));
      yield* listAttendancesRequestSaga({
        type: GET_ATTENDANCES_LIST_REQUEST,
      });

      yield delay(2000);
      yield put({ type: UPDATE_ATTENDANCE_RESET });
    } else {
      yield put(error(UPDATE_ATTENDANCE_ERROR, response));
      yield delay(2000);
      yield put({ type: UPDATE_ATTENDANCE_RESET });
    }
  } catch (err) {
    yield put(error(UPDATE_ATTENDANCE_ERROR, err));
    yield delay(2000);
    yield put({ type: UPDATE_ATTENDANCE_RESET });
  }
}

export function* watchUpdateAttendanceEmployeeData() {
  yield takeLatest(
    UPDATE_ATTENDANCE_REQUEST,
    updateAttendanceEmployeesRequestSaga
  );
}
