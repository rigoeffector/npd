import {CREATE_PROJECT_ERROR, CREATE_PROJECT_LOADING, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createProjectReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_PROJECT_LOADING:
            return {...state, loading: true};
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_PROJECT_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_PROJECT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createProjectReducer;