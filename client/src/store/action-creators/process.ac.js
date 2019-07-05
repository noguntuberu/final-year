import { CLEAR_PROCESS, UPDATE_PROCESS } from '../action-constants';

export const clearProcessStatus = (process) => ({
    type: CLEAR_PROCESS,
    payload: {
        process
    }
})
export const updateProcessStatus = (data) => ({
    type: UPDATE_PROCESS,
    payload: {
        ...data
    }
})