import {GET_EMPLOYEES_LIST_BYOTHERS_ERROR, GET_EMPLOYEES_LIST_BYOTHERS_LOADING, GET_EMPLOYEES_LIST_BYOTHERS_SUCCESS, GET_EMPLOYEES_LIST_BYOTHERS_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const getListEmployeesByOthersReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_EMPLOYEES_LIST_BYOTHERS_LOADING:
            return {...state, loading: true};
        case GET_EMPLOYEES_LIST_BYOTHERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case GET_EMPLOYEES_LIST_BYOTHERS_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_EMPLOYEES_LIST_BYOTHERS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getListEmployeesByOthersReducer;