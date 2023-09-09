import {CREATE_SITE_ERROR, CREATE_SITE_LOADING, CREATE_SITE_SUCCESS, CREATE_SITE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createSiteReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_SITE_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_SITE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_SITE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_SITE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createSiteReducer;