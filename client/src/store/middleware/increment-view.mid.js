/**
 * 
 */
import axios from 'axios';
import server from './config';
import { addPost } from '../action-creators/post.ac';
import { INCREMENT_VIEW } from '../action-constants';

export default store => next => action => {
    if (action.type === INCREMENT_VIEW) {
        axios.put(`${server.host}/post/view/${action.payload}`, {})
            .then(response => {
                const data = response.data;
                store.dispatch(addPost(data));
            }) 
            .catch(err => {
                console.log(err);
            })
    }

    next(action);
}