import axios from "axios";
import { CONN_BASE_URL, GET_ERRORS } from "./types";

export const getPerson = async (username) => {
    const res = await axios.get(`${CONN_BASE_URL}/users/get/${username}`);
    return res.data;
}

export const submitUpdate = async (userinfo) => {
    try {
        const res = await axios.post(`${CONN_BASE_URL}/users/update/profile`, userinfo);
        return res.data.status;
    } catch(err) {
        alert(err);
        return false;
    }
}

export const adminGetUser = async (request) => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/users/admin_get', request);
        return res.data;
    } catch(err) {
        return {
            status: GET_ERRORS
        }
    }
}

export const submitPassword = async (request) => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/users/change_password', request);
        return {
            result: res.data.info
        }
    } catch(err) {
        return {
            status: GET_ERRORS
        }
    }
}

export const submitDelete = async (username) => {
    await axios.delete(CONN_BASE_URL + '/users/delete', username);
}

export const submitBlock = async (username) => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/users/block', username);
        return res.data;
    } catch(err) {
        return GET_ERRORS
    }
}