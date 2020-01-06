
import { ADD_POST_UPLOAD_STAT } from "../action-constants";

export default (state = [], action) => {
    switch(action.type) {
        case ADD_POST_UPLOAD_STAT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}