import axios from "axios";
import {GET_ERRORS, INFO_CONN_BASE_URL, SET_CURRENT_USER, USER_CONN_BASE_URL} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = async (newUser) => {
    await axios.post(USER_CONN_BASE_URL + "/register", {
        username: newUser.username,
        password: newUser.password,
        confirmPassword: newUser.confirmPassword
    });

    await axios.post(INFO_CONN_BASE_URL + "/profile/create", {
        username: newUser.username,
        fullname: newUser.fullname,
        gender: newUser.gender
    });
};

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post(USER_CONN_BASE_URL + "/login", LoginRequest);
        const token = res.data.token;
        if(token) {
            localStorage.setItem('JWTToken', token);
            setJWTToken(token);

            const token_decode = jwt_decode(token);
            dispatch({
                type: SET_CURRENT_USER,
                payload: token_decode
            })
        } else {
            dispatch ({
                type: GET_ERRORS,
                payload: res.data
            });
        }
    }
    catch (err) {
        dispatch ({
            type: GET_ERRORS,
            payload: err.message
        });
    }

}
