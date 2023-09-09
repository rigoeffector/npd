/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_ASSIGN_EMPLOYEES_LIST_LOADING,
    GET_ASSIGN_EMPLOYEES_LIST_ERROR,
    GET_ASSIGN_EMPLOYEES_LIST_RESET,
    GET_ASSIGN_EMPLOYEES_LIST_REQUEST,
    GET_ASSIGN_EMPLOYEES_LIST_SUCCESS,
} from '../../reducers/assign/constants';
import {assignApi} from '../../api/assign';


export function* listAssignEmployeesRequestSaga(action) {
    try {
        yield put(loading(GET_ASSIGN_EMPLOYEES_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(assignApi.assign.readAll);
        if (response && response.success) {
            yield put(success(GET_ASSIGN_EMPLOYEES_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_ASSIGN_EMPLOYEES_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_ASSIGN_EMPLOYEES_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_ASSIGN_EMPLOYEES_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_ASSIGN_EMPLOYEES_LIST_RESET});
    }
}

export function* watchListAssignEmployeesData() {
    yield takeLatest(GET_ASSIGN_EMPLOYEES_LIST_REQUEST, listAssignEmployeesRequestSaga);
}