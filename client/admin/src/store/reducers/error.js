import {ADD_ERROR, FALSIFY_ERROR} from '../action-constants';

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_ERROR:
            return {
                ...state,
                ...action.payload
            }
        case FALSIFY_ERROR:
            return {
                ...state,
                isNew: false,
                message: ""
            }
        default:
            return state;
    }
}