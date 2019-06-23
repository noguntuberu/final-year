import {ADD_POST, FALSIFY_POST_UPLOADED, UPLOAD_POST, ADD_POST_UPLOAD_STAT} from '../action-constants';

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