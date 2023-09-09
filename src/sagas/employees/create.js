/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_EMPLOYEE_LOADING,
    CREATE_EMPLOYEE_ERROR,
    CREATE_EMPLOYEE_RESET,
    CREATE_EMPLOYEE_REQUEST,
    CREATE_EMPLOYEE_SUCCESS,
    GET_EMPLOYEES_LIST_REQUEST,
} from '../../reducers/employees/constants';
import {employeesApi} from '../../api/employees';
import { listEmployeesRequestSaga } from './read';
import history from '../../history';


export function* createEmployeeRequestSaga(action) {
    try {
        yield put(loading(CREATE_EMPLOYEE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(employeesApi.employees.create,{...payload});
        debugger;
        if (response && response.success) {
            yield put(success(CREATE_EMPLOYEE_SUCCESS, response));
            history.replace('dashboard/associates');
            yield* listEmployeesRequestSaga({
                type: GET_EMPLOYEES_LIST_REQUEST,
            });
        } else {
            yield put(error(CREATE_EMPLOYEE_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_EMPLOYEE_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_EMPLOYEE_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_EMPLOYEE_RESET});
    }
}

export function* watchCreateEmployeeData() {
    yield takeLatest(CREATE_EMPLOYEE_REQUEST, createEmployeeRequestSaga);
}