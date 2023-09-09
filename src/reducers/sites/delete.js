import {DELETE_SITE_ERROR, DELETE_SITE_LOADING, DELETE_SITE_SUCCESS, DELETE_SITE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const deleteSiteReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DELETE_SITE_LOADING:
            return {...state, loading: payload.loading};
        case DELETE_SITE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case DELETE_SITE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case DELETE_SITE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default deleteSiteReducer;