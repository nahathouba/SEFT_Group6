import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_SHOPPING_CART } from './types';

export const getShoppingCart = username => async dispatch => {
    try {
        const res = await axios.get(`${CONN_BASE_URL}/collection/shoppingcart/get/${username}`);
        dispatch({
            type: GET_SHOPPING_CART,
            payload: res.data.result
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
            payload: res.data.result
        })
        // data: {books: [...], bookstores: [...]}
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: GET_ERRORS
        })
    }
}