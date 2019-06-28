import axios from 'axios';
import server from './config';
import { LOAD_POST_ANALYSIS } from '../action-constants';
import { addPostAnalysis } from '../action-creators/post-analysis.ac';
import { addGroupAnalysis } from '../action-creators/group-analysis.ac';

export default store => next => action => {

    if (action.type === LOAD_POST_ANALYSIS ) {
        axios.get(
            `${server.host}/post/analysis/${action.payload}`,
            {
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            }
        ).then(response => {
            const {postAnalysis, groupAnalysis} = response.data;

            store.dispatch(addGroupAnalysis({
                postId: action.payload,
                body: groupAnalysis
            }));

            store.dispatch(addPostAnalysis({
                postId: action.payload,
                body: postAnalysis
            }));
        })
        .catch(err => {
            console.error(err);
        })
    }

    next(action);
}