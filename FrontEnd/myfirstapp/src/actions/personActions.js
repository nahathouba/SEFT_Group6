import axios from "axios";

export const getPerson = async (username) => {
    const res = await axios.get(`http://localhost:8080/api/users/get/${username}`);
    return res.data;
}
