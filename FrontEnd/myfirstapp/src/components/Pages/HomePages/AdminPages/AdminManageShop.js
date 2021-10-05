import React from "react";
import { Image } from "react-bootstrap-icons";
import { getShopInfo } from "../../../../actions/shopActions";
import { GET_SHOP } from "../../../../actions/types";
import './styles/admin_manage_shop.css';

function AdminManageShop(props) {

    const submitSearch = (event) => {
        event.preventDefault();

        // const shop_name = event.target.shopname.value;
        const shop_name = 'test shop';

        getShopInfo(shop_name)(dispatch => {
            if(dispatch.type === GET_SHOP)
                props.switchPage(shopDetailPage(dispatch.payload), true);
            else
                alert('Cannot get shop information!');
        })
    }

    const searchPage = (
        <>
        <form className='SearchShop' onSubmit={ submitSearch } >
            <input name='shopname' placeholder='Search for shop name' />
            <button type='submit'>Search</button>
        </form>
        <div className='Pending'>

        </div>
        </>);

    const shopDetailPage = (infos) => {
        return (
            <div className='ShopInfo'>
                <div className='ShopHeader'>
                    <Image className='ShopImg' />
                    <h1>{ infos.shop_name }</h1>
                </div>
                <div className='ShopMainPage'>

                </div>
                {/* eslint-disable-next-line */}
                <a href='javascript:void(0);'
                    onClick={ () => props.switchPage(searchPage, true) }>
                    Go Back To Search Page</a>
            </div>
        )
    }

    return searchPage;
}

export default AdminManageShop;