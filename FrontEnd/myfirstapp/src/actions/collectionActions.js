import axios from 'axios';
import { CART_CONN_BASE_URL, COLL_CONN_BASE_URL, GET_ERRORS, GET_SHOPPING_CART } from './types';
import { search } from './bookActions';

export const getShoppingCart = username => async dispatch => {
    try {
        const res = await axios.get(`${CART_CONN_BASE_URL}/${username}`);
        const book_list = [];
        for(var i = 0; i < res.data.length; i++) {
            const res1 = await search({sort: 'id', value: res.data[i].bookid});
            if(res1.type !== GET_ERRORS)
                book_list.push({...res1.payload[0], ...res.data, id: res.data.id});
        }
        
        dispatch({
            type: GET_SHOPPING_CART,
            payload: book_list
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS
        })
    }
}

export const getCollections = username => async dispatch => {
    try {
        const res = await axios.get(`${COLL_CONN_BASE_URL}/${username}`);
        const item_list = [];
        for(var i = 0; i < res.data.length; i++) {
            if(res.data[i].type === 'book') {
                const res1 = await search({sort: 'id', value: res.data[i].objectid});
                if(res1.type !== GET_ERRORS)
                    item_list.push({...res1.payload[0], ...res.data, id: res.data.id});
            } else {

            }
            
        }
        dispatch({
            type: GET_SHOPPING_CART,
            payload: item_list
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS
        })
    }
}

export const addToCart = async details => {
    try {
        await axios.post(CART_CONN_BASE_URL, details);
        return true;
    } catch(err) {
        return false;
    }
}

export const addToColl = async details => {
    try {
        await axios.post(COLL_CONN_BASE_URL, details);
        return true;
    } catch(err) {
        return false;
    }
}

export const removeCollection = async details => {
    const body = {
        id: details.id,
        objectid: details.objectid,
        username: details.username,
        type: details.type
    }
    try {
        await axios.delete(COLL_CONN_BASE_URL, body);
        return true;
    } catch(err) {
        return false;
    }
}

export const removeCart = async details => {
    const body = {
        id: details.id,
        bookid: details.bookid,
        username: details.username,
        addingdate: details.addingdate
    }
    try {
        await axios.delete(CART_CONN_BASE_URL, body);
        return true;
    } catch(err) {
        return false;
    }
}