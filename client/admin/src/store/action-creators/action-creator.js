/**
 * 
 */
import { ADD_POST, ADD_POST_ANALYSIS, ADD_GROUP_ANALYSIS, ADD_DRAFT, UPDATE_POST_ANALYSIS, UPDATE_GROUP_ANALYSIS, ADD_COMMENT, ADD_CREDENTIAL } from '../action-constants';

export default {
    addCredential: ({userId, name, token}) => ({
        type: ADD_CREDENTIAL,
        payload: {
            userId,
            name,
            token
        }
    }),

    addPost: ({id, title, body, dateCreated, image, likeCount, dislikeCount, commentCount, viewCount}) => ({
        type: ADD_POST,
        payload: {
            id,
            title,
            body,
            dateCreated,
            image,
            likeCount,
            dislikeCount,
            commentCount,
            viewCount
        }
    }),

    addPostAnalysis: ({id, postId, score}) => ({
        type: ADD_POST_ANALYSIS,
        payload: {
            id,
            postId,
            score
        }
    }),

    addGroupAnalysis: ({id, postId, className, groupName, score}) => ({
        type: ADD_GROUP_ANALYSIS,
        payload: {
            id,
            postId,
            className,
            groupName,
            score
        }
    }),

    addComment: ({id, postId, userName, dateCreated, score}) => ({
        type: ADD_COMMENT,
        payload: {
            id,
            postId,
            userName,
            dateCreated,
            score
        }
    }),

    addDraft: ({title, body, image, audience}) => ({
        type: ADD_DRAFT,
        payload: {
            title,
            body,
            image,
            audience
        }
    }),

    updatePostAnalysis: ({id, postId, score}) => ({
        type: UPDATE_POST_ANALYSIS,
        payload: {
            id,
            postId,
            score
        }
    }),

    updateGroupAnalysis: ({id, postId, className, groupName, score}) => ({
        type: UPDATE_GROUP_ANALYSIS,
        payload: {
            id,
            postId,
            className,
            groupName,
            score
        }
    })
}