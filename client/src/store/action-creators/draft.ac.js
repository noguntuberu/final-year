import {ADD_DRAFT} from '../action-constants';

export const addDraft = ({title, body, image, audience}) => ({
    type: ADD_DRAFT,
    payload: {
        title,
        body,
        image,
        audience
    }
});