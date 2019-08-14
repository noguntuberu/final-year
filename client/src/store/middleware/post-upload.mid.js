/** */
import axios from 'axios';
import server from './config';
import { addPost } from '../action-creators/post.ac';
import { updateProcessStatus} from '../action-creators/process.ac';

export default store => next => action => {
    if(action.type === 'UPLOAD_POST') {
        const {title, body, image, audience} = action.payload;
        const storeState = store.getState();
        const userId = storeState.credential.userId;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);
        formData.append('audience', audience);
        formData.append('userId', userId);

        //
        axios.post(
            server.host + '/post/new', 
            formData, 
            {
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            const data = response.data;
            if (data.success) {
                store.dispatch(addPost(data.payload));
                next(updateProcessStatus({
                    process: 'postUpload',
                    body: {
                        success: true,
                        payload: "Upload Successful"
                    }
                }));
            } else {
                next(updateProcessStatus({
                    process: 'postUpload',
                    body: {
                        ...data
                    }
                }));
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    next(action);
}