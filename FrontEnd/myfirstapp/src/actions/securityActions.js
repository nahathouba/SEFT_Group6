import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, history) => async dispatch => {
    try{
        alert(JSON.stringify(axios.defaults.headers));
        await axios.post("http://localhost:8080/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err){
        // dispatch ({
        //     type: GET_ERRORS,
        //     payload: err.response.data
        // });
        alert(err);
    }
};

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest);
        const token = res.data.token;
        if(token) {
            document.cookie = "LoginUser="
             + LoginRequest.username;

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
