/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    UPDATE_SITE_LOADING,
    UPDATE_SITE_ERROR,
    UPDATE_SITE_RESET,
    UPDATE_SITE_REQUEST,
    UPDATE_SITE_SUCCESS,
    GET_SITES_LIST_REQUEST,
} from '../../reducers/sites/constants';
import {sitesApi} from '../../api/sites';
import { getSitesRequestSaga } from './read';


export function* updateSiteRequestSaga(action) {
    try {
        yield put(loading(UPDATE_SITE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(sitesApi.sites.update, {...payload});
        if (response && response.success) {
            yield put(success(UPDATE_SITE_SUCCESS, response));
            yield* getSitesRequestSaga({
                type: GET_SITES_LIST_REQUEST,
               
            });
        } else {
            yield put(error(UPDATE_SITE_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_SITE_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_SITE_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_SITE_RESET});
    }
}

export function* watchUpdateSiteData() {
    yield takeLatest(UPDATE_SITE_REQUEST, updateSiteRequestSaga);
}