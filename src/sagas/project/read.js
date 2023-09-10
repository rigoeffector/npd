/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from "redux-saga/effects";

import { error, loading, success } from "../../actions/common";

import {
  GET_PROJECTS_LIST_LOADING,
  GET_PROJECTS_LIST_ERROR,
  GET_PROJECTS_LIST_RESET,
  GET_PROJECTS_LIST_REQUEST,
  GET_PROJECTS_LIST_SUCCESS,
} from "../../reducers/project/constants";

import { projectApi } from "../../api/project";

export function* listProjectsRequestSaga(action) {
  try {
    yield put(loading(GET_PROJECTS_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(projectApi.project.readAll);
    if (response && response.success) {
      yield put(success(GET_PROJECTS_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_PROJECTS_LIST_ERROR, response));
    }
  } catch (err) {
    yield put(error(GET_PROJECTS_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_PROJECTS_LIST_RESET });
  }
}

export function* watchListProjectsData() {
  yield takeLatest(GET_PROJECTS_LIST_REQUEST, listProjectsRequestSaga);
}
