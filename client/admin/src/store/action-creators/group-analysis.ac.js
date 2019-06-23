import {ADD_GROUP_ANALYSIS, UPDATE_GROUP_ANALYSIS} from '../action-constants';

export const addGroupAnalysis = ({id, postId, className, groupName, score}) => ({
    type: ADD_GROUP_ANALYSIS,
    payload: {
        id,
        postId,
        className,
        groupName,
        score
    }
});

export const updateGroupAnalysis = ({id, postId, className, groupName, score}) => ({
    type: UPDATE_GROUP_ANALYSIS,
    payload: {
        id,
        postId,
        className,
        groupName,
        score
    }
})