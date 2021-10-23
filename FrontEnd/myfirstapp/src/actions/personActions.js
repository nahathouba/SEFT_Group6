import axios from "axios";
import { PUBLIC_USER } from "../handlers/userTypes";
import { CONN_BASE_URL, GET_ERRORS } from "./types";

export const getPerson = async (username) => {
    const res = await axios.get(`${CONN_BASE_URL}/userinfo/get/${username}`);
    return res.data;
}

export const submitUpdate = async (userinfo) => {
    try {
        const res = await axios.post(`${CONN_BASE_URL}/userinfo/profile/update`, userinfo);
        return res.data;
    } catch(err) {
        return false;
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
        await axios.delete(CONN_BASE_URL + `/userinfo/${username}`);
        await axios.delete(CONN_BASE_URL + `/users/${username}`);
        return true;
    } catch(err){
        return false;
    }
}

export const degrade = async (username) => {
    try {
        // delete shops, books and degrade user to public user
        await axios.delete(`${CONN_BASE_URL}/shops/${username}`);
        await axios.delete(`${CONN_BASE_URL}/books/${username}`);
        await submitUpdate({username: username, role: PUBLIC_USER});
        return true;
    } catch(err) {
        return GET_ERRORS
    }
}