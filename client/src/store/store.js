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
import postAnalysisMiddleware from './middleware/load-analysis.mid';

const initState = storePersister.initializeStore();

const store = createStore(reducer, initState, applyMiddleware(
    loginMiddleware,
    userRegistrationMiddleware,
    postLoaderMiddleware,
    postUploadMiddleware,
    postAnalysisMiddleware
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