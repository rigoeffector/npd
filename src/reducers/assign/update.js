import {UPDATE_ASSIGN_EMPLOYEE_ERROR, UPDATE_ASSIGN_EMPLOYEE_LOADING, UPDATE_ASSIGN_EMPLOYEE_SUCCESS, UPDATE_ASSIGN_EMPLOYEE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateAssignEmployeeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_ASSIGN_EMPLOYEE_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_ASSIGN_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case UPDATE_ASSIGN_EMPLOYEE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case UPDATE_ASSIGN_EMPLOYEE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateAssignEmployeeReducer;