/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    UPDATE_PROJECT_LOADING,
    UPDATE_PROJECT_ERROR,
    UPDATE_PROJECT_RESET,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    GET_PROJECTS_LIST_REQUEST,
} from '../../reducers/project/constants';
import {projectApi} from '../../api/project';
import {  listProjectsRequestSaga } from './read';



export function* updateProjectRequestSaga(action) {
    try {
        yield put(loading(UPDATE_PROJECT_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(projectApi.project.update,{...payload});
        debugger;
        if (response && response.success) {
            yield put(success(UPDATE_PROJECT_SUCCESS, response));
            yield* listProjectsRequestSaga({
                type: GET_PROJECTS_LIST_REQUEST,
            });
            yield delay(2000);
            yield put({type: UPDATE_PROJECT_RESET})
        } else {
            yield put(error(UPDATE_PROJECT_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_PROJECT_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_PROJECT_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_PROJECT_RESET});
    }
}

export function* watchUpdateProjectData() {
    yield takeLatest(UPDATE_PROJECT_REQUEST, updateProjectRequestSaga);
}