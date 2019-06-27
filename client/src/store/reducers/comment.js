import { ADD_COMMENT } from "../action-constants";

/**
 * 
 */

//
export default (state = {}, action) => {
    switch(action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                [action.payload.postId]: {
                    ...state[action.payload.postId],
                    [action.payload._id]: {...action.payload}
                }
            }
        default:
            return state;
    }
}