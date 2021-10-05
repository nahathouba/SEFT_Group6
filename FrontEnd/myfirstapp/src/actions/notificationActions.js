import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_SEARCH_DETAILS } from './types';

export const getNotifications = async (username) => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/notifications/${username}`);
        return {
            type: GET_SEARCH_DETAILS,
            payload: res.data.info
        }
    }  catch(err) {
        return {
            type: GET_ERRORS,
            payload: err
        }
    }
}