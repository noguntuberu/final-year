import axios from 'axios';
import server from './config';
import { addLoadedPosts } from '../action-creators/post.ac';

export default store => next => action => {
    if (action.type === 'LOAD_POSTS' ) {
        // get posts from DB
        axios.get(
            `${server.host}/post/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                }
            }
        ).then(response => {
            console.log(response.data);
            next(addLoadedPosts(response.data));
        })
        .catch(err => {
            console.error(err);
        })
    }

    next(action);
}