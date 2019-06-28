/** */
import axios from 'axios';
import server from './config';
import { addCredential } from '../action-creators/credential.ac';
import { updateProcessStatus } from '../action-creators/process.ac';

export default store => next => action => {
    if(action.type === 'LOGIN') {
        let {email, password } = action.payload; 
        axios.post(
            server.host + '/user/login', 
            {email, password},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                }
            }
        ).then(response => {
            const {success, payload} = response.data;
            if (success) {
                next(addCredential(payload));
            } else {
                store.dispatch(updateProcessStatus({
                    process: 'login',
                    body: {
                        success: false,
                        payload: payload
                    }
                }))
            }
        })  
        .catch(err => {
            console.log(err);
        })
    }
    next(action);
}