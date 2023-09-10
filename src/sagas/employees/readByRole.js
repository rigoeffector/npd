/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_EMPLOYEES_LIST_BYROLE_LOADING,
    GET_EMPLOYEES_LIST_BYROLE_ERROR,
    GET_EMPLOYEES_LIST_BYROLE_RESET,
    GET_EMPLOYEES_LIST_BYROLE_REQUEST,
    GET_EMPLOYEES_LIST_BYROLE_SUCCESS,
} from '../../reducers/employees/constants';
import {employeesApi} from '../../api/employees';


export function* listEmployeesByroleRequestSaga(action) {
    try {
        yield put(loading(GET_EMPLOYEES_LIST_BYROLE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(employeesApi.employees.readByRole,{...payload});
        if (response && response.success) {
            yield put(success(GET_EMPLOYEES_LIST_BYROLE_SUCCESS, response));
        } else {
            yield put(error(GET_EMPLOYEES_LIST_BYROLE_ERROR, response));
            yield delay(2000);
            yield put({type: GET_EMPLOYEES_LIST_BYROLE_RESET});
        }
    } catch (err) {
        yield put(error(GET_EMPLOYEES_LIST_BYROLE_ERROR, err));
        yield delay(2000);
        yield put({type: GET_EMPLOYEES_LIST_BYROLE_RESET});
    }
}

export function* watchListEmployeesByRoleData() {
    yield takeLatest(GET_EMPLOYEES_LIST_BYROLE_REQUEST, listEmployeesByroleRequestSaga);
}