import { ADD_DRAFT } from "../action-constants";

/**
 * 
 */
//

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_DRAFT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}