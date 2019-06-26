import {ADD_CREDENTIAL} from '../action-constants';

export const addCredential = ({userId, name, level, token}) => ({
    type: ADD_CREDENTIAL,
    payload: {
        isLoggedIn: true,
        userId,
        name,
        level: parseInt(level),
        token
    }
});