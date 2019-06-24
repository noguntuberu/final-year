import {ADD_ERROR, FALSIFY_ERROR} from '../action-constants';

export const addError = (message) => ({
    type: ADD_ERROR,
    payload: {
        isNew: true,
        message: message
    }
});

export const falsifyError = () => ({
    type: FALSIFY_ERROR
});