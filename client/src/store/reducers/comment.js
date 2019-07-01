import { ADD_COMMENT, ADD_BATCH_COMMENTS } from "../action-constants";

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
        case ADD_BATCH_COMMENTS :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}