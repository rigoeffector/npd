/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    DELETE_SITE_LOADING,
    DELETE_SITE_ERROR,
    DELETE_SITE_RESET,
    DELETE_SITE_REQUEST,
    DELETE_SITE_SUCCESS,
    GET_SITES_LIST_REQUEST,
} from '../../reducers/sites/constants';
import {sitesApi} from '../../api/sites';
import { getSitesRequestSaga } from './read';


export function* deleteSiteRequestSaga(action) {
    try {
        yield put(loading(DELETE_SITE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(sitesApi.sites.delete, {...payload});
        if (response && response.success) {
            yield put(success(DELETE_SITE_SUCCESS, response));
            yield* getSitesRequestSaga({
                type: GET_SITES_LIST_REQUEST,
            });
            yield delay(2000);
            yield put({type: DELETE_SITE_RESET});
        } else {
            yield put(error(DELETE_SITE_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_SITE_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_SITE_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_SITE_RESET});
    }
}

export function* watchDeleteSiteData() {
    yield takeLatest(DELETE_SITE_REQUEST, deleteSiteRequestSaga);
}