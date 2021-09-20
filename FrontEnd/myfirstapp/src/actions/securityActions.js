import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = async (newUser) => {
    await axios.post("http://localhost:8080/api/users/register", newUser);
};

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest);
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
