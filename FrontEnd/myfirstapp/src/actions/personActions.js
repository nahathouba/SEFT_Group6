import axios from "axios";
import { GET_USER } from "./types";

export const getPerson = (username) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/api/user/get/${username}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
}
