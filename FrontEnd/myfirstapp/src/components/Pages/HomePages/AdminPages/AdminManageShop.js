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

        const searched_shop = event.target.shop.value;
        if(searched_shop.length) {
            const res = await getShopInfo(searched_shop);
            if(res.type !== GET_ERRORS) {
                setShop(res.payload);
            }
        } else {
            alert("Please input a shop name to search!")
        }
    }

    function refresh() {
        setShop(null);
        getShopInfo(shop.owner).then(res=>{
            if(res.type !== GET_ERRORS)
                setShop(res.payload);
        })
    }

    function createShop() {
        if(shop) {
            render(<BookStore shop={shop} refresh={refresh} />, shop_ref.current);
        } else {
            render(<></>, shop_ref.current);
        }
    }

    useEffect(createShop, [shop])

    return (
        <>
        <form className='SearchShop AdminSearch' onSubmit={searchShop}>
            <input type='text' name='shop' placeholder='Search a shop with shop owner username here' />
            <button>Search</button>
        </form>
        <div ref={shop_ref}></div>
        </>
    )
}

export default AdminManageShop;