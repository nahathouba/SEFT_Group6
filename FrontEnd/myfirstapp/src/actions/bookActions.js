import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_BOOK_DETAILS } from './types';

export const search = async (search_form) => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/books/request', search_form);
        return ({
            type: GET_BOOK_DETAILS,
            payload: res.data.result
        })
    } catch(err) {
        return ({
            type: GET_ERRORS,
            payload: err
        })
    }
}

export const searchShop = async (shop) => {
    // tmp
    try {
        const res = await axios.post(CONN_BASE_URL + '/books/request', shop);
        return ({
            type: GET_BOOK_DETAILS,
            payload: res.data.result
        })
    } catch(err) {
        return ({
            type: GET_ERRORS,
            payload: err
        })
    }

}