import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    DELETE_ASSIGN_EMPLOYEE_LOADING,
    DELETE_ASSIGN_EMPLOYEE_ERROR,
    DELETE_ASSIGN_EMPLOYEE_RESET,
    DELETE_ASSIGN_EMPLOYEE_REQUEST,
    DELETE_ASSIGN_EMPLOYEE_SUCCESS,
    GET_ASSIGN_EMPLOYEES_LIST_REQUEST
} from '../../reducers/assign/constants';
import {assignApi} from '../../api/assign';
import {listAssignEmployeesRequestSaga} from './read';

export function* deleteAssignEmployeesRequestSaga(action) {
    try {
        yield put(loading(DELETE_ASSIGN_EMPLOYEE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(assignApi.assign.delete, {...payload});
        if (response && response.success) {
            yield put(success(DELETE_ASSIGN_EMPLOYEE_SUCCESS, response));
            yield* listAssignEmployeesRequestSaga({
                type: GET_ASSIGN_EMPLOYEES_LIST_REQUEST,
               
            });
            yield delay(2000);
            yield put({type: DELETE_ASSIGN_EMPLOYEE_RESET});
        } else {
            yield put(error(DELETE_ASSIGN_EMPLOYEE_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_ASSIGN_EMPLOYEE_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_ASSIGN_EMPLOYEE_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_ASSIGN_EMPLOYEE_RESET});
    }
}

export function* watchDeleteAssignEmployeeData() {
    yield takeLatest(DELETE_ASSIGN_EMPLOYEE_REQUEST, deleteAssignEmployeesRequestSaga);
}