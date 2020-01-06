import { REGISTER_USER } from '../action-constants';

export const registerUser = (data) => ({
    type: REGISTER_USER,
    payload: {
        ...data
    }
})
