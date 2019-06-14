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

export default combineReducers({
    posts,
    comments,
    credential,
    postAnalysis,
    groupAnalysis,
    postDraft
})