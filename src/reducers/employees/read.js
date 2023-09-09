import {GET_EMPLOYEES_LIST_ERROR, GET_EMPLOYEES_LIST_LOADING, GET_EMPLOYEES_LIST_SUCCESS, GET_EMPLOYEES_LIST_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const getListEmployeesReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_EMPLOYEES_LIST_LOADING:
            return {...state, loading: true};
        case GET_EMPLOYEES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case GET_EMPLOYEES_LIST_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_EMPLOYEES_LIST_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getListEmployeesReducer;