import {CREATE_REPORT_ERROR, CREATE_REPORT_LOADING, CREATE_REPORT_SUCCESS, CREATE_REPORT_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createReportReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_REPORT_LOADING:
            return {...state, loading: true};
        case CREATE_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_REPORT_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_REPORT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createReportReducer;