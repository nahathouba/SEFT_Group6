import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_SEARCH_DETAILS } from './types';

export const getNotifications = (username) => async dispatch => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/notifications/${username}`);
        dispatch({
            type: GET_SEARCH_DETAILS,
            payload: res.data.info
        })
    }  catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
}