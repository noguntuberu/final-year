import {ADD_POST_ANALYSIS, LOAD_POST_ANALYSIS, UPDATE_POST_ANALYSIS} from '../action-constants';

export const addPostAnalysis = ({postId, body}) => ({
    type: ADD_POST_ANALYSIS,
    payload: {
        postId,
        body
    }
});

export const loadPostAnalysis = postId => ({
    type: LOAD_POST_ANALYSIS,
    payload: postId
})

export const updatePostAnalysis = (data) => ({
    type: UPDATE_POST_ANALYSIS,
    payload: {...data }
});