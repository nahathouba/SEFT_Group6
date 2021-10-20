import React, { useEffect, useRef, useState } from "react";
import Default from '../Default';
import ManageShop from "./ManageShop";
import EditBooks from "./EditBooks";
import EditPromotion from "./EditPromotion";
import { render } from "react-dom";
import './manage.css';
import BookStore from "../SinglePages/BookStore";

function Manage() {

    const [current, setCurrent] = useState('ManageShop');
    const main_ref = useRef(null);
    const sp_btns_ref = useRef(null);

    function selectPage(event) {
        setCurrent(event.target.getAttribute('name'));
    }

    function switchPage() {

        var page;
        switch(current) {
            case 'ManageShop':
                page = <ManageShop />; break;
            case 'PublicSearch':
                page = <Default />; break;
            case 'EditShopInfo':
                page = <BookStore shop={{}} />; break;
            case 'EditBookInfo':
                page = <EditBooks />; break;
            case 'EditPromotion':
                page = <EditPromotion />; break;
            case 'EditShop':
                setCurrent('EditShopInfo'); return;

            default: return;
        }

        const before = document.querySelectorAll(".manage-select-page .selected");
        if(before)
            before.forEach(e=>{e.classList.remove('selected');})
        document.querySelector(`span[name='${current}']`).classList.add('selected');

        if(current === 'EditShopInfo' || current === 'EditBookInfo') {
            sp_btns_ref.current.style.display = 'unset';
            document.querySelector(`span[name='EditShop']`).classList.add('selected');
        } else {
            sp_btns_ref.current.style.display = 'none';
        }
            
        render(page, main_ref.current);
    }

    useEffect(switchPage, [current])

    return (
        <>
        <div className='manage-show-page' ref={main_ref} ></div>
        <div className='manage-select-page'>
            <span name='ManageShop' onClick={selectPage}>Manage my shop</span>
            <span name='PublicSearch' onClick={selectPage}>Public search</span>
            <span name='EditShop' onClick={selectPage}>Editing my shop</span>
            <div ref={sp_btns_ref}>
                <span name='EditShopInfo' className='special' onClick={selectPage}>Edit shop information</span>
                <span name='EditBookInfo' className='special' onClick={selectPage}>Edit books information</span>
            </div>
            <span name='EditPromotion' onClick={selectPage}>Manage promoition</span>
        </div>
        </>
    );
}

export default Manage;