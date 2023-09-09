import {GET_EMPLOYEES_LIST_BYROLE_ERROR, GET_EMPLOYEES_LIST_BYROLE_LOADING, GET_EMPLOYEES_LIST_BYROLE_SUCCESS, GET_EMPLOYEES_LIST_BYROLE_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const getListEmployeesByroleReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_EMPLOYEES_LIST_BYROLE_LOADING:
            return {...state, loading: true};
        case GET_EMPLOYEES_LIST_BYROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case GET_EMPLOYEES_LIST_BYROLE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_EMPLOYEES_LIST_BYROLE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getListEmployeesByroleReducer;