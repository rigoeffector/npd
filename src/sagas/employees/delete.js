/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    DELETE_EMPLOYEE_LOADING,
    DELETE_EMPLOYEE_ERROR,
    DELETE_EMPLOYEE_RESET,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    GET_EMPLOYEES_LIST_REQUEST,
} from '../../reducers/employees/constants';
import {employeesApi} from '../../api/employees';
import { listEmployeesRequestSaga } from './read';
import history from '../../history';


export function* deleteEmployeeRequestSaga(action) {
    try {
        yield put(loading(DELETE_EMPLOYEE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(employeesApi.employees.delete,{...payload});
        if (response && response.success) {
            yield put(success(DELETE_EMPLOYEE_SUCCESS, response));
            yield* listEmployeesRequestSaga({
                type: GET_EMPLOYEES_LIST_REQUEST,
            });
            yield delay(2000);
            yield put({type: DELETE_EMPLOYEE_RESET});
        } else {
            yield put(error(DELETE_EMPLOYEE_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_EMPLOYEE_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_EMPLOYEE_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_EMPLOYEE_RESET});
    }
}

export function* watchDeleteEmployeeData() {
    yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeRequestSaga);
}