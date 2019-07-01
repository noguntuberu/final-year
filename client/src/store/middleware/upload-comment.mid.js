import axios from 'axios';
import server from './config';
import { addComment } from '../action-creators/comment.ac';
import { updateProcessStatus } from '../action-creators/process.ac';
import { UPLOAD_COMMENT } from '../action-constants';

export default store => next => action => {
    if (action.type === UPLOAD_COMMENT) {
        axios.post(
            `${server.host}/post/comment`, 
            {...action.payload} ,
            {
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            }
        ).then(response => {
            const {success, payload } = response.data;
            if (success) {
                store.dispatch(addComment(payload))
                store.dispatch(updateProcessStatus({
                    process: 'comment',
                    body: {
                        success: true, 
                        payload: "Successful"
                    }
                }))
            } else {
                store.dispatch(updateProcessStatus({
                    process: 'comment',
                    body: {
                        success: false, 
                        payload: "failed"
                    }
                }))
            }
        })
        .catch(err => {
            console.error(err);
        })
    }

    next(action);
}