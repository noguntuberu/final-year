import { ADD_POST_ANALYSIS, UPDATE_POST_ANALYSIS } from "../action-constants";

/**
 * 
 */
//

export default (state = [], action) => {
    switch(action.type) {
        case ADD_POST_ANALYSIS:
            return [
                ...state,
                {...action.payload}
            ]
        case UPDATE_POST_ANALYSIS:
            let updatedPosts = state.map(analysisItem => {
                return action.payload.id === analysisItem.id ? {...action.payload} : analysisItem
            });
            return updatedPosts; 
        default:
            return state
    }
}