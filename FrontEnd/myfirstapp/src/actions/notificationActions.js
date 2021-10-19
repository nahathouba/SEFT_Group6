import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_BOOK_DETAILS, GET_UNREAD } from './types';

export const getUnread = (username) => async dispatch => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/notifications/unread/${username}`);
        dispatch({
            type: GET_UNREAD,
            payload: res.data.unread
        })
    }  catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
}

export const getNotifications = (username) => async dispatch => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/notifications/${username}`);
        dispatch({
            type: GET_BOOK_DETAILS,
            payload: res.data.info
        })
    }  catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
}