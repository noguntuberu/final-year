/** */
import { LOAD_USER_ACTIONS,  UPDATE_USER_ACTION } from '../action-constants';

export const updateUserAction = (data) => ({
    type: UPDATE_USER_ACTION,
    payload: {...data}
})

export const loadUserActions = (data) => ({
    type: LOAD_USER_ACTIONS,
    payload: {
        ...data
    }
})