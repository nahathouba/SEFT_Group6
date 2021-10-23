import axios from 'axios';
import { search } from './bookActions';
import { GET_BOOK_DETAILS, GET_ERRORS, GET_SHOP, SHOP_CONN_BASE_URL, STORE_CONN_BASE_URL, UPDATE_SHOP } from './types';

export const getShopInfo = async (owner) => {
    try {
        const res = await axios.get(`${SHOP_CONN_BASE_URL}/${owner}`);
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
        const res = await axios.get(STORE_CONN_BASE_URL + '/request_books/' + username);
        const book_list = [];
        for(var i = 0; i < res.data.length; i++) {
            const res1 = await search({sort: 'id', value: res.data[i].id});
            if(res1.type !== GET_ERRORS)
                book_list.push(res1.payload[0]);
        }
        return ({
            type: GET_BOOK_DETAILS,
            payload: book_list
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
        const res = await axios.post(SHOP_CONN_BASE_URL + '/update/', shop_details);
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
        const res = await axios.post(SHOP_CONN_BASE_URL + '/create/', shop_details);
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