import {UPDATE_REPORT_ERROR, UPDATE_REPORT_LOADING, UPDATE_REPORT_SUCCESS, UPDATE_REPORT_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateReportReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_REPORT_LOADING:
            return {...state, loading: true};
        case UPDATE_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case UPDATE_REPORT_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case UPDATE_REPORT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateReportReducer;