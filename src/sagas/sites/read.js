/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_SITES_LIST_LOADING,
    GET_SITES_LIST_ERROR,
    GET_SITES_LIST_RESET,
    GET_SITES_LIST_REQUEST,
    GET_SITES_LIST_SUCCESS,
} from '../../reducers/sites/constants';
import {sitesApi} from '../../api/sites';


export function* getSitesRequestSaga(action) {
    try {
        yield put(loading(GET_SITES_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(sitesApi.sites.readAll);
        if (response && response.success) {
            yield put(success(GET_SITES_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_SITES_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_SITES_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_SITES_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_SITES_LIST_RESET});
    }
}

export function* watchListSiteData() {
    yield takeLatest(GET_SITES_LIST_REQUEST, getSitesRequestSaga);
}