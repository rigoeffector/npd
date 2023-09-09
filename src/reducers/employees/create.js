import {CREATE_EMPLOYEE_ERROR, CREATE_EMPLOYEE_LOADING, CREATE_EMPLOYEE_SUCCESS, CREATE_EMPLOYEE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createEmployeeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_EMPLOYEE_LOADING:
            return {...state, loading: true};
        case CREATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_EMPLOYEE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_EMPLOYEE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createEmployeeReducer;