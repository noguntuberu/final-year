/**
 * 
 */
//

//
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import storePersister from './persist-store';

//MIDDLEWARES
import loginMiddleware from './middleware/login.mid';
import userRegistrationMiddleware from './middleware/register.mid';
import postUploadMiddleware from './middleware/post-upload.mid';
import postLoaderMiddleware from './middleware/load-post.mid';
import deletePostMiddleware from './middleware/delete-post.mid';
import commenUploaderMiddleware from './middleware/upload-comment.mid';
import commentLoaderMiddleWare from './middleware/load-comments.mid';
import postAnalysisMiddleware from './middleware/load-analysis.mid';
import incrementPostViewMiddleware from './middleware/increment-view.mid';
import updateUserActionMiddleware from './middleware/user-action.mid';

const initState = storePersister.initializeStore();

const store = createStore(reducer, initState, applyMiddleware(
    loginMiddleware,
    userRegistrationMiddleware,
    postLoaderMiddleware,
    deletePostMiddleware,
    incrementPostViewMiddleware,
    commentLoaderMiddleWare,
    commenUploaderMiddleware,
    postUploadMiddleware,
    postAnalysisMiddleware,
    updateUserActionMiddleware
));

// STORE SUBSCRIBERS

// Save store to localstorage
store.subscribe(() => {
    storePersister.saveStore(store.getState());
})
store.subscribe( () => {
    let state = store.getState();
    console.log(state);
})

export default store;