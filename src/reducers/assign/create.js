import {CREATE_ASSIGN_EMPLOYEE_ERROR, CREATE_ASSIGN_EMPLOYEE_LOADING, CREATE_ASSIGN_EMPLOYEE_SUCCESS, CREATE_ASSIGN_EMPLOYEE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createAssignEmployeeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_ASSIGN_EMPLOYEE_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_ASSIGN_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_ASSIGN_EMPLOYEE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_ASSIGN_EMPLOYEE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createAssignEmployeeReducer;