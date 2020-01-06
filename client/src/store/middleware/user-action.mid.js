/** */
import axios from 'axios';
import server from './config';
import { UPDATE_USER_ACTION } from '../action-constants';
import { updateUserAction } from '../action-creators/user-action.ac';
import { addLoadedPosts } from '../action-creators/post.ac';

export default store => next => action => {
    if(action.type === UPDATE_USER_ACTION) {
        axios.put(`${server.host}/post/stat`, {...action.payload})
            .then(response => {
                const {posts, userAction} =response.data.payload;
                store.dispatch(addLoadedPosts(posts));
                next(updateUserAction(userAction));
            })
            .catch(err => {
                console.error(err);
            })
    }
    next(action);
}