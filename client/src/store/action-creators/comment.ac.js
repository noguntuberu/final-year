import {ADD_COMMENT, ADD_BATCH_COMMENTS, UPLOAD_COMMENT, LOAD_COMMENTS} from '../action-constants';

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

export const addBatchComments = (postId, comments) => ({
    type: ADD_BATCH_COMMENTS,
    payload: {
        [postId] : {...comments}
    }
})

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