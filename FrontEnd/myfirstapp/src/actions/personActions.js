import axios from "axios";
import { CONN_BASE_URL, GET_ERRORS, SUCCESS } from "./types";

export const getPerson = async (username) => {
    const res = await axios.get(`${CONN_BASE_URL}/users/get/${username}`);
    return res.data;
}

export const submitUpdate = async (userinfo) => {
    try {
        const res = await axios.post(`${CONN_BASE_URL}/users/profile/update`, userinfo);
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
        return res.data.status
    } catch(err) {
        return GET_ERRORS
    }
}

export const submitDelete = async (username) => {
    try {
        await axios.delete(CONN_BASE_URL + `/users/${username}`);
        return true;
    } catch(err){
        return false;
    }
}

export const submitBlock = async (username) => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/users/block/${username}`, );
        return (res.data.status === 'SUCCESS' ? SUCCESS : GET_ERRORS);
    } catch(err) {
        return GET_ERRORS
    }
}