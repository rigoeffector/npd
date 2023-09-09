import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_INTERNAL_ASSET_LOADING,
    CREATE_INTERNAL_ASSET_ERROR,
    CREATE_INTERNAL_ASSET_RESET,
    CREATE_INTERNAL_ASSET_REQUEST,
    CREATE_INTERNAL_ASSET_SUCCESS,
    GET_ASSIGN_EMPLOYEES_LIST_REQUEST
} from '../../reducers/assign/constants';
import {assignApi} from '../../api/assign';
import {listAssignEmployeesRequestSaga} from './read';

export function* createAssignEmployeesRequestSaga(action) {
    try {
        yield put(loading(CREATE_INTERNAL_ASSET_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(assignApi.assign.create, {...payload});
        if (response && response.success) {
            yield put(success(CREATE_INTERNAL_ASSET_SUCCESS, response));
            yield* listAssignEmployeesRequestSaga({
                type: GET_ASSIGN_EMPLOYEES_LIST_REQUEST,
               
            });
            yield delay(2000);
            yield put({type: CREATE_INTERNAL_ASSET_RESET});
        } else {
            yield put(error(CREATE_INTERNAL_ASSET_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_INTERNAL_ASSET_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_INTERNAL_ASSET_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_INTERNAL_ASSET_RESET});
    }
}

export function* watchCreateInternalAssetData() {
    yield takeLatest(CREATE_INTERNAL_ASSET_REQUEST, createAssignEmployeesRequestSaga);
}