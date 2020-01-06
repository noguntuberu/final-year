import { ADD_CREDENTIAL } from "../action-constants";

/**
 * 
 */
//

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_CREDENTIAL:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}