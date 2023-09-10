import {DELETE_PROJECT_ERROR, DELETE_PROJECT_LOADING, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const deleteProjectReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DELETE_PROJECT_LOADING:
            return {...state, loading: true};
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case DELETE_PROJECT_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case DELETE_PROJECT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default deleteProjectReducer;