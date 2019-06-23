import {ADD_COMMENT} from '../action-constants';

export const addComment = ({id, postId, userName, dateCreated, score}) => ({
    type: ADD_COMMENT,
    payload: {
        id,
        postId,
        userName,
        dateCreated,
        score
    }
});