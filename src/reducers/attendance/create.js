import {CREATE_ATTENDANCE_ERROR, CREATE_ATTENDANCE_LOADING, CREATE_ATTENDANCE_SUCCESS, CREATE_ATTENDANCE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createAttendanceReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_ATTENDANCE_LOADING:
            return {...state, loading: true};
        case CREATE_ATTENDANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_ATTENDANCE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_ATTENDANCE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createAttendanceReducer;