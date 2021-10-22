import axios from 'axios';
import { CONN_BASE_URL, GET_BOOK_DETAILS, GET_ERRORS, GET_SHOP, UPDATE_SHOP } from './types';

export const getShopInfo = async (owner) => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/shops/${owner}`);
        return({
            type: GET_SHOP,
            payload: res.data
        })
    } catch(err) {
        return({
            type: GET_ERRORS,
            payload: err
        })
    }
}

export const searchShop = async (username) => {
    try {
        const res = await axios.get(CONN_BASE_URL + '/shops/request_books/' + username);
        return ({
            type: GET_BOOK_DETAILS,
            payload: res.data
        })
    } catch(err) {
        return ({
            type: GET_ERRORS,
            payload: err
        })
    }

}

export const updateShop = async (shop_details) => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/shops/update/', shop_details);
        return ({
            type: UPDATE_SHOP,
            payload: res.data
        })
    } catch(err) {
        return ({
            type: GET_ERRORS,
            payload: err
        })
    }
}

export const createShop = async (shop_details) => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/shops/create/', shop_details);
        return ({
            type: UPDATE_SHOP,
            payload: res.data
        })
    } catch(err) {
        return ({
            type: GET_ERRORS,
            payload: err
        })
    }
}