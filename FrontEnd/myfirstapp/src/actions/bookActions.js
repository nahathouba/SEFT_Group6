import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_BOOK_DETAILS } from './types';

export const search = async (search_form) => {
    try {
        const res = await axios.post(CONN_BASE_URL + '/books/request', search_form);
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

export const addBook = async book => {
    try {
        await axios.post(CONN_BASE_URL + '/books/add', book);
        return true;
    } catch(err) {
        return false;
    }
}

export const deleteBook = async id => {
    try {
        await axios.delete(CONN_BASE_URL + '/books/', {id: id});
        return true;
    } catch(err) {
        return false;
    }
}

export const updateBook = async book => {
    try {
        await axios.post(CONN_BASE_URL + '/books/update', book);
        return true;
    } catch(err) {
        return false;
    }
}