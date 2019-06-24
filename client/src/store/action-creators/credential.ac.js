import {ADD_CREDENTIAL} from '../action-constants';

export const addCredential = ({userId, name, token}) => ({
    type: ADD_CREDENTIAL,
    payload: {
        isLoggedIn: true,
        userId,
        name,
        token
    }
});