import axios from "axios";
import { PUBLIC_USER } from "../handlers/userTypes";
import { BOOK_CONN_BASE_URL, GET_ERRORS, INFO_CONN_BASE_URL, SHOP_CONN_BASE_URL, STORE_CONN_BASE_URL, USER_CONN_BASE_URL } from "./types";

export const getPerson = async (username) => {
    const res = await axios.get(`${INFO_CONN_BASE_URL}/get/${username}`);
    return res.data;
}

export const submitUpdate = async (userinfo) => {
    try {
        const res = await axios.post(`${INFO_CONN_BASE_URL}/profile/update`, userinfo);
        return res.data;
    } catch(err) {
        return false;
    }
}

export const submitPassword = async (request) => {
    try {
        const res = await axios.post(USER_CONN_BASE_URL + '/change_password', request);
        return res.data.status
    } catch(err) {
        return GET_ERRORS
    }
}

export const submitDelete = async (username) => {
    try {
        await axios.delete(`${INFO_CONN_BASE_URL}/${username}`);
        await axios.delete(`${USER_CONN_BASE_URL}/${username}`);
        return true;
    } catch(err){
        return false;
    }
}

export const degrade = async (username) => {
    try {
        // delete shops, books and degrade user to public user
        await axios.delete(`${BOOK_CONN_BASE_URL}/${username}`);
        await axios.delete(`${SHOP_CONN_BASE_URL}/${username}`);
        await axios.delete(`${STORE_CONN_BASE_URL}/${username}`);
        await submitUpdate({username: username, role: PUBLIC_USER});
        return true;
    } catch(err) {
        return GET_ERRORS
    }
}