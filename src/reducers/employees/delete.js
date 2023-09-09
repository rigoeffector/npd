import {DELETE_EMPLOYEE_ERROR, DELETE_EMPLOYEE_LOADING, DELETE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const deleteEmployeeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DELETE_EMPLOYEE_LOADING:
            return {...state, loading: true};
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case DELETE_EMPLOYEE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case DELETE_EMPLOYEE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default deleteEmployeeReducer;