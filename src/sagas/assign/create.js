import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_ASSIGN_EMPLOYEE_LOADING,
    CREATE_ASSIGN_EMPLOYEE_ERROR,
    CREATE_ASSIGN_EMPLOYEE_RESET,
    CREATE_ASSIGN_EMPLOYEE_REQUEST,
    CREATE_ASSIGN_EMPLOYEE_SUCCESS,
    GET_ASSIGN_EMPLOYEES_LIST_REQUEST
} from '../../reducers/assign/constants';
import {assignApi} from '../../api/assign';
import {listAssignEmployeesRequestSaga} from './read';
import { GET_EMPLOYEES_LIST_BYOTHERS_REQUEST } from '../../reducers/employees/constants';
import { listEmployeesByOthersRequestSaga } from '../employees/readByOther';

export function* createAssignEmployeesRequestSaga(action) {
    try {
        yield put(loading(CREATE_ASSIGN_EMPLOYEE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(assignApi.assign.create, {...payload});
        if (response && response.success) {
            yield put(success(CREATE_ASSIGN_EMPLOYEE_SUCCESS, response));
            yield* listAssignEmployeesRequestSaga({
                type: GET_ASSIGN_EMPLOYEES_LIST_REQUEST,
               
            });
            yield * listEmployeesByOthersRequestSaga({
                type: GET_EMPLOYEES_LIST_BYOTHERS_REQUEST,

            })
            yield delay(2000);
            yield put({type: CREATE_ASSIGN_EMPLOYEE_RESET});
        } else {
            yield put(error(CREATE_ASSIGN_EMPLOYEE_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_ASSIGN_EMPLOYEE_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_ASSIGN_EMPLOYEE_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_ASSIGN_EMPLOYEE_RESET});
    }
}

export function* watchCreateAssignEmployeeData() {
    yield takeLatest(CREATE_ASSIGN_EMPLOYEE_REQUEST, createAssignEmployeesRequestSaga);
}