import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_SHOPPING_CART } from './types';

export const getShoppingCart = username => async dispatch => {
    try {
        const res = await axios.get(`${CONN_BASE_URL}/collection/shoppingcart/get/${username}`);
        dispatch({
            type: GET_SHOPPING_CART,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: GET_ERRORS
        })
    }
}

export const getCollections = username => async dispatch => {
    try {
        const res = await axios.get(`${CONN_BASE_URL}/collection/colls/get/${username}`);
        dispatch({
            type: GET_SHOPPING_CART,
            payload: res.data
        })
        // data: {books: [...], bookstores: [...]}
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: GET_ERRORS
        })
    }
}

export const addToCart = async details => {
    try {
        await axios.post(CONN_BASE_URL + '/collection/shoppingcart/', details);
        return true;
    } catch(err) {
        return false;
    }
}

export const addToColl = async details => {
    try {
        await axios.post(CONN_BASE_URL + '/collection/colls/', details);
        return true;
    } catch(err) {
        return false;
    }
}

export const removeCollection = async id => {
    try {
        await axios.delete(CONN_BASE_URL + '/collection/colls/', {id: id});
        return true;
    } catch(err) {
        return false;
    }
}

export const removeCart = async id => {
    try {
        await axios.delete(CONN_BASE_URL + '/collection/shoppingcart/', {id: id});
        return true;
    } catch(err) {
        return false;
    }
}