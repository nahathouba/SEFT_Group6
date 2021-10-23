import React, { useEffect, useRef, useState } from "react";
import Default from '../Default';
import ManageShop from "./ManageShop";
import EditBooks from "./EditBooks";
import { render } from "react-dom";
import './manage.css';
import BookStore from "../SinglePages/BookStore";
import { getShopInfo, searchShop } from "../../../../actions/shopActions";
import { GET_ERRORS } from "../../../../actions/types";

function Manage(props) {

    const [current, setCurrent] = useState('ManageShop');
    const [books, setBooks] = useState([]);
    const [shop_info, setShopInfo] = useState({});
    const main_ref = useRef(null);
    const sp_btns_ref = useRef(null);

    function selectPage(event) {
        setCurrent(event.target.getAttribute('name'));
    }

    function switchPage() {

        var page;
        switch(current) {
            case 'ManageShop':
                page = <ManageShop books={books} showBook={props.showBook} />; break;
            case 'PublicSearch':
                page = <Default showBook={props.showBook} />; break;
            case 'EditShopInfo':
                page = <BookStore refresh={refresh} shop={shop_info} />; break;
            case 'EditBookInfo':
                page = <EditBooks refresh={refresh} books={books} user={props.user} />; break;
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

    function init() {
        getShopInfo(props.user.username).then(res=>{
            if(res.type !== GET_ERRORS)
                setShopInfo(res.payload);
        })
        searchShop(props.user.username).then(res=>{
            if(res.type !== GET_ERRORS)
                setBooks(res.payload);
        });
    }

    function refresh() {
        setShopInfo({});
        setBooks([]);
        render(<></>, main_ref.current);
        init();
    }

    useEffect(init, [props.current_page]);

    useEffect(switchPage, [current]);
    useEffect(switchPage, [books]);
    useEffect(switchPage, [shop_info]);

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
        </div>
        </>
    );
}

export default Manage;