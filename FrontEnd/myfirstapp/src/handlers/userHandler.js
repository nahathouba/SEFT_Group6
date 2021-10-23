import '../reducers/personReducer';
import { createNewUser } from '../actions/securityActions';
import { login as securityLogin } from '../actions/securityActions';
import setJWTToken from '../securityUtils/setJWTToken';

export function login(email, password, dispatch) {
    const user = {
        username: email,
        password: password
    }

    securityLogin(user)(dispatch);
}

export function logout(history, interval) {
    setJWTToken(localStorage.getItem('JWTToken'));
    localStorage.removeItem('JWTToken');
    if(interval)
        clearInterval(interval);
    history.push('/');
}

export function register(firstname, lastname, email, password, repassword, gender) {
    createNewUser({
        fullname: firstname + ' ' + lastname,
        username: email,
        password: password,
        confirmPassword: repassword,
        gender: gender
    });
}