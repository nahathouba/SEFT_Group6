import axios from 'axios';
import { GET_ERRORS, GET_BOOK_DETAILS, BOOK_CONN_BASE_URL, STORE_CONN_BASE_URL } from './types';

export const search = async (search_form) => {
    try {
        const res = await axios.post(BOOK_CONN_BASE_URL + '/request', search_form);
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
        const res = await axios.post(BOOK_CONN_BASE_URL + '/add', book);
        if(res) {
            await axios.post(STORE_CONN_BASE_URL + '/add', {id: res.data.id, owner: book.owner})
        }
        return true;
    } catch(err) {
        return false;
    }
}

export const deleteBook = async details => {
    try {
        await axios.delete(STORE_CONN_BASE_URL, {id: details.id, owner: details.owner});
        await axios.delete(BOOK_CONN_BASE_URL, details);
        return true;
    } catch(err) {
        return false;
    }
}

export const updateBook = async book => {
    try {
        await axios.post(BOOK_CONN_BASE_URL + '/update', book);
        return true;
    } catch(err) {
        return false;
    }
}