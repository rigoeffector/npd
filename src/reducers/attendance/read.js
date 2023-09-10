import {GET_ATTENDANCES_LIST_ERROR, GET_ATTENDANCES_LIST_LOADING, GET_ATTENDANCES_LIST_SUCCESS, GET_ATTENDANCES_LIST_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const getAttendanceReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_ATTENDANCES_LIST_LOADING:
            return {...state, loading: true};
        case GET_ATTENDANCES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case GET_ATTENDANCES_LIST_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_ATTENDANCES_LIST_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getAttendanceReducer;