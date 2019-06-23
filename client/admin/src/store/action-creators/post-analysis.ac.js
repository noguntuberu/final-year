import {ADD_POST_ANALYSIS, UPDATE_POST_ANALYSIS} from '../action-constants';

export const addPostAnalysis = (data) => ({
    type: ADD_POST_ANALYSIS,
    payload: {...data}
});

export const updatePostAnalysis = (data) => ({
    type: UPDATE_POST_ANALYSIS,
    payload: {...data }
});