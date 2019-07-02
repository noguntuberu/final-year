
import { ADD_POST, ADD_LOADED_POSTS  } from "../action-constants";

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                [action.payload._id]: {...action.payload}
            } 
        case ADD_LOADED_POSTS:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}