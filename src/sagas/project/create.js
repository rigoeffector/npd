/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_PROJECT_LOADING,
    CREATE_PROJECT_ERROR,
    CREATE_PROJECT_RESET,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,
    GET_PROJECTS_LIST_REQUEST,
} from '../../reducers/project/constants';
import {projectApi} from '../../api/project';
import { listEmployeesRequestSaga, listProjectsRequestSaga } from './read';
import history from '../../history';


export function* createProjectRequestSaga(action) {
    try {
        yield put(loading(CREATE_PROJECT_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(projectApi.project.create,{...payload});
        debugger;
        if (response && response.success) {
            yield put(success(CREATE_PROJECT_SUCCESS, response));
            yield* listProjectsRequestSaga({
                type: GET_PROJECTS_LIST_REQUEST,
            });
            yield delay(2000);
            yield put({type: CREATE_PROJECT_RESET})
        } else {
            yield put(error(CREATE_PROJECT_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_PROJECT_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_PROJECT_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_PROJECT_RESET});
    }
}

export function* watchCreateProjectData() {
    yield takeLatest(CREATE_PROJECT_REQUEST, createProjectRequestSaga);
}