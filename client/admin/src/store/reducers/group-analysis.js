import { ADD_GROUP_ANALYSIS, UPDATE_GROUP_ANALYSIS } from "../action-constants";

/**
 * 
 */
//

export default (state = [], action) => {
    switch(action.type) {
        case ADD_GROUP_ANALYSIS:
            return [
                ...state,
                {...action.payload}
            ]
        case UPDATE_GROUP_ANALYSIS:
            let updatedGroupAnalysisItems = state.map(analysisItem => {
                return action.payload.id === analysisItem.id ? {...action.payload} : analysisItem;
            })
            return updatedGroupAnalysisItems;
        default:
            return state;
    }
}