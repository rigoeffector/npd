import {UPDATE_SITE_ERROR, UPDATE_SITE_LOADING, UPDATE_SITE_SUCCESS, UPDATE_SITE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateSiteReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_SITE_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_SITE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case UPDATE_SITE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case UPDATE_SITE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateSiteReducer;