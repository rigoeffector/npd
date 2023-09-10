import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  CREATE_ATTENDANCE_LOADING,
  CREATE_ATTENDANCE_ERROR,
  CREATE_ATTENDANCE_RESET,
  CREATE_ATTENDANCE_REQUEST,
  CREATE_ATTENDANCE_SUCCESS,
} from "../../reducers/attendance/constants";
import { attendanceApi } from "../../api/attendance";
import { listAttendancesRequestSaga } from "./read";
import { GET_ATTENDANCES_LIST_REQUEST } from "../../reducers/attendance/constants";

export function* createAttendanceEmployeesRequestSaga(action) {
  try {
    yield put(loading(CREATE_ATTENDANCE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(attendanceApi.attendance.create, {
      ...payload,
    });
    if (response && response.success) {
      yield put(success(CREATE_ATTENDANCE_SUCCESS, response));
      yield* listAttendancesRequestSaga({
        type: GET_ATTENDANCES_LIST_REQUEST,
      });

      yield delay(2000);
      yield put({ type: CREATE_ATTENDANCE_RESET });
    } else {
      yield put(error(CREATE_ATTENDANCE_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_ATTENDANCE_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_ATTENDANCE_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_ATTENDANCE_RESET });
  }
}

export function* watchCreateAttendanceEmployeeData() {
  yield takeLatest(
    CREATE_ATTENDANCE_REQUEST,
    createAttendanceEmployeesRequestSaga
  );
}
