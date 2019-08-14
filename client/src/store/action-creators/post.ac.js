/**
 * @author Oguntuberu Nathan O.
 */
import { ADD_POST, ADD_LOADED_POSTS, FALSIFY_POST_UPLOADED, 
        ADD_POST_UPLOAD_STAT, LOAD_POSTS, UPLOAD_POST, 
        INCREMENT_VIEW, DELETE_POST } from '../action-constants';

export const loadPosts = userId => ({
    type: LOAD_POSTS,
    payload: userId
})

export const addLoadedPosts = (posts) => ({
    type: ADD_LOADED_POSTS,
    payload: {
        ...posts
    }
})

export const addPost = (data) => ({
    type: ADD_POST,
    payload: {...data}
});

export const uploadPost = (title, body, image, audience)=> ({
    type: UPLOAD_POST,
    payload: {
        title,
        body,
        image,
        audience
    }
})

export const falsifyPostUploaded = () => ({
    type: FALSIFY_POST_UPLOADED,
    payload: {}
})

export const addPostUploadStat = (isUploaded, message ) => ({
    type: ADD_POST_UPLOAD_STAT,
    payload: {
        isUploaded,
        message
    }
})

export const incrementPostView = postId => ({
    type: INCREMENT_VIEW,
    payload: postId
})

export const deletePost = postId => ({
    type: DELETE_POST,
    payload: postId
})