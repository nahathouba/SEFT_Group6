import '../reducers/personReducer';
import { SHA1 } from 'crypto-js';
import { createNewUser } from '../actions/securityActions';
import { login as securityLogin } from '../actions/securityActions';
import setJWTToken from '../securityUtils/setJWTToken';
import { getNotifications } from '../actions/notificationActions';


export function login(email, password, dispatch) {
    const user = {
        username: email,
        password: SHA1(password)
    }

    securityLogin(user)(dispatch);
    
        // document.cookie = "LoginUser="+user.id;
        // document.cookie = "LoginUser="+JSON.stringify(user);
}

export function logout(history) {
    setJWTToken(localStorage.getItem('JWTToken'));
    localStorage.removeItem('JWTToken');
    history.push('/');
}

export function register(firstname, lastname, email, password, repassword, gender) {
    createNewUser({
        full_name: firstname + ' ' + lastname,
        username: email,
        password: password,
        confirm_password: repassword,
        gender: gender
    });
}

export async function getUserNotifications(username) {
    // eslint-disable-next-line
    const res = await getNotifications(username);

    // judge...

    return [[], true];
    // return [[notifications], contains_unread]
}