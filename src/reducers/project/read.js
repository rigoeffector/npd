import {GET_PROJECTS_LIST_ERROR, GET_PROJECTS_LIST_LOADING, GET_PROJECTS_LIST_SUCCESS, GET_PROJECTS_LIST_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const listProjectsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_PROJECTS_LIST_LOADING:
            return {...state, loading: true};
        case GET_PROJECTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case GET_PROJECTS_LIST_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_PROJECTS_LIST_RESET:
            return initialState;
        default:
            return state;
    }
};

export default listProjectsReducer;