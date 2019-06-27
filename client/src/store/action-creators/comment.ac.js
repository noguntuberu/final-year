import {ADD_COMMENT, UPLOAD_COMMENT, LOAD_COMMENTS} from '../action-constants';

export const addComment = ({_id, postId, userName, body, dateCreated, score}) => ({
    type: ADD_COMMENT,
    payload: {
        _id,
        postId,
        userName,
        body,
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