import axios from 'axios';
import server from './config';
import { addComment } from '../action-creators/comment.ac';
import { LOAD_COMMENTS } from '../action-constants';

export default state => next => action => {
    if (action.type === LOAD_COMMENTS) {
        axios.get(`${server.host}/post/comment/${action.payload}`)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    next(action);
}