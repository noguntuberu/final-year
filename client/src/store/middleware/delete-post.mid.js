/**
 * 
 */
import axios from 'axios';
import server from './config';
import { DELETE_POST } from '../action-constants';

export default store => next => action => {
    if (action.type === DELETE_POST) {
        axios.delete(`${server.host}/post/${action.payload}`, {})
            .then(response => {
                const data = response.data;
                if (data.success) {
                    next(action);
                }
            }) 
            .catch(err => {
                console.log(err);
            })
    }

    next(action);
}