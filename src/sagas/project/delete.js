/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    DELETE_PROJECT_LOADING,
    DELETE_PROJECT_ERROR,
    DELETE_PROJECT_RESET,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    GET_PROJECTS_LIST_REQUEST,
} from '../../reducers/project/constants';
import {projectApi} from '../../api/project';
import {  listProjectsRequestSaga } from './read';



export function* deleteProjectRequestSaga(action) {
    try {
        yield put(loading(DELETE_PROJECT_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(projectApi.project.delete,{...payload});
        debugger;
        if (response && response.success) {
            yield put(success(DELETE_PROJECT_SUCCESS, response));
            yield* listProjectsRequestSaga({
                type: GET_PROJECTS_LIST_REQUEST,
            });
            yield delay(2000);
            yield put({type: DELETE_PROJECT_RESET})
        } else {
            yield put(error(DELETE_PROJECT_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_PROJECT_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_PROJECT_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_PROJECT_RESET});
    }
}

export function* watchDeleteProjectData() {
    yield takeLatest(DELETE_PROJECT_REQUEST, deleteProjectRequestSaga);
}