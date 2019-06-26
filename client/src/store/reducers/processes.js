import {UPDATE_PROCESS} from '../action-constants';

export default (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROCESS:
            return {
                ...state,
                [action.payload.process] : {
                    ...action.payload.body
                }
            }
        default:
            return state;
    }
} 