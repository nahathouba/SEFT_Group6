import axios from 'axios';
import { GET_ERRORS, GET_BOOK_DETAILS, GET_UNREAD, SEND_NOTIFICATION, MSGS_CONN_BASE_URL } from './types';

export const getUnread = (username) => async dispatch => {
    try {
        const res = await axios.get(`${MSGS_CONN_BASE_URL}/unread/${username}`);
        dispatch({
            type: GET_UNREAD,
            payload: (res.data.status === "UNREAD")
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
        const res = await axios.get(`${MSGS_CONN_BASE_URL}/${username}`);
        dispatch({
            type: GET_BOOK_DETAILS,
            payload: res.data
        })
    } catch(err) {
        return({
            type: GET_ERRORS,
            payload: err
        })
    }
}

export const readNotification = async (msg) => {
    await axios.post(MSGS_CONN_BASE_URL +'/read', msg);
    return true;
}

export const sendNotification = async (body) => {
    try {
        await axios.post(MSGS_CONN_BASE_URL +'/send', body);
        return ({
            type: SEND_NOTIFICATION
        })
    } catch(err) {
        return({
            type: GET_ERRORS,
            payload: err
        })
    }
}