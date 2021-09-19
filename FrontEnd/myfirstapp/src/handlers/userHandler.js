import '../reducers/personReducer';
import { SHA1 } from 'crypto-js';
import { createNewUser } from '../actions/securityActions';
import { login as securityLogin } from '../actions/securityActions';
import setJWTToken from '../securityUtils/setJWTToken';


export function login(email, password, dispatch) {
    const user = {
        username: email,
        password: SHA1(password)
    }

    securityLogin(user)(dispatch);
    
        // document.cookie = "LoginUser="+user.id;
        // document.cookie = "LoginUser="+JSON.stringify(user);
}

export function logout() {
    setJWTToken(localStorage.getItem('JWTToken'));
    localStorage.removeItem('JWTToken');
    localStorage.removeItem('LoginUser');
}

export function register(firstname, lastname, email, password, repassword, gender, history) {
    createNewUser({
        full_name: firstname + ' ' + lastname,
        username: email,
        password: password,
        confirm_password: repassword,
        gender: gender
    }, history)(dispatch=>{});
}

export function getLoginUser() {

    // const cookies = document.cookie.split("; ");
    // for(var i = 0; i < cookies.length; i++) {
    //     const e = cookies[i].split("=");
    //     if(e[0] === "LoginUser")
    //         return JSON.parse(e[1]);
    // }
    return localStorage.getItem('LoginUser');
}

export function getUserNotifications(username) {
    // return [[notifications], contains_unread]
    return [[], true];
}