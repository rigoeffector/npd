import {UPDATE_PROJECT_ERROR, UPDATE_PROJECT_LOADING, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_RESET} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateProjectReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_PROJECT_LOADING:
            return {...state, loading: true};
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload?.success,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case UPDATE_PROJECT_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case UPDATE_PROJECT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateProjectReducer;