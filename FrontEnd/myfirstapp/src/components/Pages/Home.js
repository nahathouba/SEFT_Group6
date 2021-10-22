import React, { useEffect, useRef, useState } from "react";
import { PersonCircle, Cart3, Star, Bell, Gear, InfoCircle, BoxArrowLeft, HouseDoor, Book, Shop } from "react-bootstrap-icons";
import { logout } from "../../handlers/userHandler";
import { getUnread } from "../../actions/notificationActions";
import { GET_ERRORS } from "../../actions/types";
import { render } from "react-dom";
import '../../styles/home.css';

import Account from "./HomePages/Account";
import Collections from "./HomePages/Collections";
import Default from "./HomePages/Default";
import Manage from "./HomePages/ShopOwnerPages/Manage";
import Notifications from "./HomePages/Notifications";
import Settings from "./HomePages/Settings";
import ShoppingCart from "./HomePages/ShoppingCart";
import Help from "./Help";
import AdminManageAccount from "./HomePages/AdminPages/AdminManageAccount";
import AdminManageBook from "./HomePages/AdminPages/AdminManageBook";
import AdminManageShop from "./HomePages/AdminPages/AdminManageShop";
import { ADMIN, SHOP_OWNER } from "../../handlers/userTypes";

function Home(props) {

    if(!props.location.state)
        props.history.push("/");

    const user = props.location.state;

    const ref = useRef(null);
    const [current_page, setCurrentPage] = 
        useState((user.role === ADMIN ? 'ManageShop' : user.role === SHOP_OWNER ? 'Manage' : 'Home'));
    const [unread, setUnread] = useState(false);
    const [interval, updateIntervalID] = useState(null);


    function switchPage(event) {
        document.querySelector(".SelectedButton").classList.remove('SelectedButton');
        event.target.classList.add('SelectedButton');

        setCurrentPage(event.target.name);
    }

    function renderPage() {
        var page;
        const common_props = {
            user: user,
            current_page: current_page
        }
        switch(current_page){
            case "Home": page = <Default />; break;
            case "Manage": page = <Manage { ...common_props } />; break;
            case "Account": page = <Account history={props.history} user={user} interval={interval} />; break;
            case "ShoppingCart": page = <ShoppingCart { ...common_props } />; break;
            case "Collections": page = <Collections { ...common_props } />; break;
            case "Notifications": page = <Notifications { ...common_props } />; break;
            case "Settings": page = <Settings { ...common_props } />; break;
            case "About": page = <Help about={true} />; break;
            case "ManageShop": page = <AdminManageShop />; break;
            case "ManageAccount": page = <AdminManageAccount />; break;
            case "ManageBook": page = <AdminManageBook />; break;
            default: page = <></>;
        }
        render(page, ref.current);
    }

    useEffect(renderPage, [current_page]);

    // fire when compontent loaded
    useEffect(()=>{
        function getMsg() {
            getUnread(user.username)(res=>{
                if(res.type !== GET_ERRORS) {
                    setUnread(res.payload);
                }
            })
        }
        getMsg();
        const id = setInterval(getMsg, 60000);
        updateIntervalID(id);
    // eslint-disable-next-line
    }, [])

    return (
    <>
        <h5 className="LOGO_ad">Hello, { (user.role === ADMIN ? "Admin " : "Mr.") }{ user.full_name }</h5>
        
            <div className="MenuPage">
                {(user.role !== ADMIN ? 
                
                <>
                {(user.role === SHOP_OWNER ? 
                // for shop owner
                <button onClick={ switchPage } name='Manage' className='SelectedButton'>
                    <HouseDoor className="BtnIcon" />
                    Home
                </button>
                 : 
                 <button onClick={ switchPage } name='Home' className='SelectedButton'>
                    <HouseDoor className="BtnIcon" />
                    Home
                </button>)}

                <button onClick={ switchPage } name='Account'>
                    <PersonCircle className="BtnIcon" />
                    Account
                </button>

                <button onClick={ switchPage } name='ShoppingCart'>
                    <Cart3 className="BtnIcon" />
                    Shopping Cart
                </button>
                
                <button onClick={ switchPage } name='Collections'>
                    <Star className="BtnIcon" />
                    Collections
                </button>
                
                <button onClick={ switchPage } name='About'>
                    <InfoCircle className="BtnIcon" />
                    About
                </button> </>:

                // for admin
                <>
                <button onClick={ switchPage } name='ManageShop' className='SelectedButton'>
                    <Shop className="BtnIcon" />
                    Manage Shop
                </button>
                
                <button onClick={ switchPage } name='ManageAccount'>
                    <PersonCircle className="BtnIcon" />
                    Manage Account
                </button>
                <button onClick={ switchPage } name='ManageBook'>
                    <Book className="BtnIcon" />
                    Manage Book
                </button> </>)}
                
                <div className={ unread ? "UnreadMsg" : null}></div>
                <button onClick={ switchPage } name='Notifications'>
                    <Bell className="BtnIcon" />
                    Notifications
                </button>
                
                <button onClick={ switchPage } name='Settings'>
                    <Gear className="BtnIcon" />
                    Settings
                </button>
                
                <button onClick={ () => {
                    logout(props.history, interval);
                } }>
                    <BoxArrowLeft className="BtnIcon" />
                    Log out
                </button>
            </div>

        <div className="ContentPage" ref={ref}></div>
    </>
    )
}

export default Home;