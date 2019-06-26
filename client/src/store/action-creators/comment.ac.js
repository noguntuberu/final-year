import {ADD_COMMENT, UPLOAD_COMMENT, LOAD_COMMENTS} from '../action-constants';

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

export const uploadComment = ({userId, postId, body}) => ({
    type: UPLOAD_COMMENT,
    payload: {
        userId,
        postId,
        body
    }
})

export const loadComments = postId => ({
    type: LOAD_COMMENTS,
    payload: postId
})