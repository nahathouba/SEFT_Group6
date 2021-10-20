import axios from 'axios';
import { CONN_BASE_URL, GET_ERRORS, GET_SHOP } from './types';

export const getShopInfo = async (shop_name) => {
    try {
        const res = await axios.get(CONN_BASE_URL + `/shop/${shop_name}`);
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