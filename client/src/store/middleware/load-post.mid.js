import axios from 'axios';
import server from './config';
import { addLoadedPosts } from '../action-creators/post.ac';
import { loadUserActions } from '../action-creators/user-action.ac';

export default store => next => action => {
    if (action.type === 'LOAD_POSTS' ) {
        // get posts from DB
        axios.get(
            `${server.host}/post/${action.payload}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                }
            }
        ).then(response => {
            const {posts, userActions } = response.data;
            store.dispatch(addLoadedPosts(posts));
            store.dispatch(loadUserActions(userActions));
        })
        .catch(err => {
            console.error(err);
        })
    }

    next(action);
}