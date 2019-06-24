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
import error from './reducers/error';
import postUploadStat from './reducers/post-stat';

export default combineReducers({
    posts,
    postUploadStat,
    comments,
    credential,
    postAnalysis,
    groupAnalysis,
    postDraft,
    error
})