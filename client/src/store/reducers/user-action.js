import { LOAD_USER_ACTIONS, UPDATE_USER_ACTION } from '../action-constants';

export default (state = {}, action) => {
    switch(action.type) {
        case LOAD_USER_ACTIONS: 
            return {
                ...action.payload
            }
        case UPDATE_USER_ACTION:
            return {
                ...state,
                [action.payload.postId]: {...action.payload}
            }
        default:
            return state
    }
}