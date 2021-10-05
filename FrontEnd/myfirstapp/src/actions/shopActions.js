import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_SHOP } from './types';

export const getShopInfo = (shop_name) => async dispatch => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/shop/${shop_name}`);
        dispatch({
            type: (res.data.error ? GET_ERRORS : GET_SHOP),
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
}