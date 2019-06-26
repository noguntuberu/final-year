import { UPDATE_PROCESS } from '../action-constants';

export const updateProcessStatus = (data) => ({
    type: UPDATE_PROCESS,
    payload: {
        ...data
    }
})