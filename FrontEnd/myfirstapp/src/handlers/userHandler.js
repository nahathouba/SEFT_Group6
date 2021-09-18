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
    document.cookie += "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

export function register(firstname, lastname, email, password, repassword, gender, history) {
    createNewUser({
        full_name: firstname + ' ' + lastname,
        username: email,
        password: SHA1(password),
        confirm_password: SHA1(repassword),
        gender: gender
    }, history);
}

export function getLoginUser() {

    const cookies = document.cookie.split("; ");
    for(var i = 0; i < cookies.length; i++) {
        const e = cookies[i].split("=");
        if(e[0] === "LoginUser")
            return JSON.parse(e[1]);
    }
}

export function getUserNotifications(userid) {
    // return [[notifications], contains_unread]
    return [[], true];
}