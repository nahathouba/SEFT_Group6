import '../reducers/personReducer';
import { SHA256 } from 'crypto-js';

function encode(password) {
    return SHA256(password);
}

function validateUser(email, password) {
    password = encode(password);
    return {
        id: "0",
        email: email,
        username: "First Last"
    };
}


export function login(email, password) {
    var user = validateUser(email, password);
    if(user) {
        document.cookie = "LoginUser="+JSON.stringify(user);
        return true;
    } else {
        return false;
    }
}

export function logout() {
    document.cookie += "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

export function register(firstname, lastname, email, password, gender) {
    login(email, password);
}

export function isUserLoggedIn() {
    const cookies = document.cookie.split("; ");
    for(var i = 0; i < cookies.length; i++) {
        const e = cookies[i].split("=");
        if(e[0] === "LoginUser")
            return JSON.parse(e[1]);
    }
    return false;
}

export function getUserNotifications(userid) {
    // return [[notifications], contains_unread]
    return [[], true];
}