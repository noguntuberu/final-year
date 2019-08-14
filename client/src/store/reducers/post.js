
import { ADD_POST, ADD_LOADED_POSTS, DELETE_POST  } from "../action-constants";

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
        case DELETE_POST:
            let newState = {...state};
            delete newState[action.payload];
            return {
                ...newState
            }
        default:
            return state;
    }
}