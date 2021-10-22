import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_BOOK_DETAILS, GET_UNREAD, SEND_NOTIFICATION } from './types';

export const getUnread = (username) => async dispatch => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/notifications/unread/${username}`);
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
        const res = await axios.get(CONN_BASE_URL + `/notifications/${username}`);
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

export const readNotification = async (msgid) => {
    await axios.post(CONN_BASE_URL + '/notifications/read', {id: msgid});
    return true;
}

export const sendNotification = async (body) => {
    try {
        await axios.post(CONN_BASE_URL + `/notifications/send`, body);
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