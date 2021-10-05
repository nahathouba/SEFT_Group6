import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_SEARCH_DETAILS } from './types';

export const search = (search_form) => async dispatch => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/books/request', search_form);
        dispatch({
            type: GET_SEARCH_DETAILS,
            payload: res.data.result
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: {
                status: GET_ERRORS,
                msg: err.message
            }
        })
    }
    
}