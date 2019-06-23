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
import postUploadMiddleware from './middleware/post-upload.mid';

const initState = storePersister.initializeStore();

const store = createStore(reducer, initState, applyMiddleware(
    loginMiddleware,
    postUploadMiddleware
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