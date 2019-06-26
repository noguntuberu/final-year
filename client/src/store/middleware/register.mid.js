
import axios from 'axios';
import server from './config';
import { updateProcessStatus } from '../action-creators/process.ac';
import { REGISTER_USER} from '../action-constants';

export default store => next => action => {
    if(action.type === REGISTER_USER) {
        axios.post(server.host + '/user/register', {...action.payload})
            .then(response => {
                store.dispatch(updateProcessStatus({
                    process: 'registration',
                    body: { ...response.data }
                }))
            })
            .catch(err => {
                console.error(err);
            })
    }
    next(action);
}