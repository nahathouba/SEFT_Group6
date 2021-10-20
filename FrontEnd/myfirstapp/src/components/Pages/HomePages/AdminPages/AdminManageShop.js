import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { getShopInfo } from "../../../../actions/shopActions";
import { GET_ERRORS } from "../../../../actions/types";
import BookStore from "../SinglePages/BookStore";
import './styles/admin_manage_shop.css';

function AdminManageShop() {

    const [shop, setShop] = useState(null);
    const shop_ref = useRef(null);

    async function searchShop(event) {
        event.preventDefault();

        const shop = event.target.shop.value;
        if(shop.length) {
            const res = await getShopInfo(shop);
            if(res.type !== GET_ERRORS) {
                setShop(res.payload);
            }
        } else {
            alert("Please input a shop name to search!")
        }
    }

    function createShop() {
        if(shop) {
            render(<BookStore shop={shop} />, shop_ref.current);
        }
    }

    useEffect(createShop, [shop])

    return (
        <>
        <form className='SearchShop AdminSearch' onSubmit={searchShop}>
            <input type='text' name='shop' placeholder='Search for a shop here...' />
            <button>Search</button>
        </form>
        <div ref={shop_ref}></div>
        </>
    )
}

export default AdminManageShop;