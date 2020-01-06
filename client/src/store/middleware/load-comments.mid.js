import axios from 'axios';
import server from './config';
import { addBatchComments } from '../action-creators/comment.ac';
import { LOAD_COMMENTS } from '../action-constants';

export default store => next => action => {
    if (action.type === LOAD_COMMENTS) {
        axios.get(
            `${server.host}/post/comment/${action.payload}`,
            {
                headers: {
                'Access-Control-Allow-Origin' : '*'
                }
            }
        ).then(response => {
            const postId = action.payload;
            const comments = {...response.data};
            store.dispatch(addBatchComments(postId, comments));
        })
        .catch(err => {
            console.log(err);
        })
    }

    next(action);
}