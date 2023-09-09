/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_EMPLOYEES_LIST_LOADING,
    GET_EMPLOYEES_LIST_ERROR,
    GET_EMPLOYEES_LIST_RESET,
    GET_EMPLOYEES_LIST_REQUEST,
    GET_EMPLOYEES_LIST_SUCCESS,
} from '../../reducers/employees/constants';
import {employeesApi} from '../../api/employees';


export function* listEmployeesRequestSaga(action) {
    try {
        yield put(loading(GET_EMPLOYEES_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(employeesApi.employees.readAll);
        if (response && response.success) {
            yield put(success(GET_EMPLOYEES_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_EMPLOYEES_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_EMPLOYEES_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_EMPLOYEES_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_EMPLOYEES_LIST_RESET});
    }
}

export function* watchListEmployeesData() {
    yield takeLatest(GET_EMPLOYEES_LIST_REQUEST, listEmployeesRequestSaga);
}