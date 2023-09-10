import {UPDATE_ATTENDANCE_ERROR, UPDATE_ATTENDANCE_LOADING, UPDATE_ATTENDANCE_SUCCESS, UPDATE_ATTENDANCE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateAttendanceReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_ATTENDANCE_LOADING:
            return {...state, loading: true};
        case UPDATE_ATTENDANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case UPDATE_ATTENDANCE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case UPDATE_ATTENDANCE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateAttendanceReducer;