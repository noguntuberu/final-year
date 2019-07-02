/**
 * 
 */

//
import { combineReducers } from 'redux';
import posts from './reducers/post';
import comments from './reducers/comment';
import postAnalysis from './reducers/post-analysis';
import groupAnalysis from './reducers/group-analysis';
import postDraft from './reducers/draft';
import credential from './reducers/credential';
import processes from './reducers/processes';
import userAction from './reducers/user-action';

export default combineReducers({
    posts,
    processes,
    comments,
    credential,
    postAnalysis,
    groupAnalysis,
    postDraft,
    userAction
})