import axios from "axios";
import { CONN_BASE_URL } from "./types";

export const getPerson = async (username) => {
    const res = await axios.get(`${CONN_BASE_URL}/users/get/${username}`);
    return res.data;
}

export const submitUpdate = async (userinfo) => {
    try {
        const res = await axios.post(`${CONN_BASE_URL}/users/update`, userinfo);
        return res.data.status;
    } catch(err) {
        alert(err);
        return false;
    }
}