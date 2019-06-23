/** */
import axios from 'axios';
import server from './config';
import { addCredential } from '../action-creators/credential.ac';
import { addError } from '../action-creators/error.ac';

export default store => next => action => {
    if(action.type === 'LOGIN') {
        let {email, password } = action.payload; 
        axios.post(server.host + '/user/login', {email, password})
            .then(response => {
                if (response.data.success) {
                    let {userId, name, token} = response.data.payload;
                    next(addCredential({userId, name, token}));
                } else {
                    next(addError(response.data.payload));
                }
            })  
            .catch(err => {
                console.log(err);
            })
    }
    next(action);
}