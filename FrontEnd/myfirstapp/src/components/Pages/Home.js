import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { PersonCircle, Cart3, Star, Bell, Gear, ChatDots, InfoCircle, BoxArrowLeft, HouseDoor } from "react-bootstrap-icons";
import { getUserNotifications, isUserLoggedIn, logout } from "../../handlers/userHandler";
import '../../styles/home.css';
import Account from "./HomePages/Account";
import Collections from "./HomePages/Collections";
import CustomerService from "./HomePages/CustomerService";
import Default from "./HomePages/Default";
import Notifications from "./HomePages/Notifications";
import Settings from "./HomePages/Settings";
import ShoppingCart from "./HomePages/ShoppingCart";
import About from "./HomePages/About";

class Home extends Component {

    constructor(props) {
        super(props);
        const user = isUserLoggedIn();
        if(!user)
            this.props.history.push("/");
            
        this.state = {
            user: user,
            infos: {
                unread_msg: false
            }
        };
    }

    loadInfos() {
        // get state and infos
        var state = this.state;
        var infos = state.infos;

        // get all infos
        // may have more infos in the future
        infos.unread_msg = getUserNotifications()[1];

        // set state
        state.infos = infos;
        this.setState(state);
    }

    // setinterval for load infos
    componentDidMount() {
        this.backInterval = setInterval(()=>{
            this.loadInfos();
        }, 60000)
    }

    componentWillMount() {
        clearInterval(this.backInterval);
    }

    switchPage = (pageType) => {
        var page = null;
        switch(pageType) {
            case "Account": page = <Account />; break;
            case "ShoppingCart": page = <ShoppingCart />; break;
            case "Collections": page = <Collections />; break;
            case "Notifications": page = <Notifications />; break;
            case "Settings": page = <Settings />; break;
            case "CustomerServices": page = <CustomerService />; break;
            case "About": page = <About />; break;
            default: page = <Default />;
        }

        ReactDOM.render(page, document.getElementById("content_page"));
    }

    render() {
        return (
            <>
                <h5 className="LOGO_ad">Hello, Mr.{ this.state.user.username }</h5>
                <div className="MenuPage">
                    <button onClick={ () => this.switchPage("Home") }>
                        <HouseDoor className="BtnIcon" />
                        Home
                    </button>

                    <button onClick={ () => this.switchPage("Account") }>
                        <PersonCircle className="BtnIcon" />
                        Account
                    </button>

                    <button onClick={ () => this.switchPage("ShoppingCart") }>
                        <Cart3 className="BtnIcon" />
                        Shopping Cart
                    </button>
                    
                    <button onClick={ () => this.switchPage("Collections") }>
                        <Star className="BtnIcon" />
                        Collections
                    </button>
                    
                    <div className={ this.state.infos.unread_msg ? "UnreadMsg" : null}></div>
                    <button onClick={ () => this.switchPage("Notifications") }>
                        <Bell className="BtnIcon" />
                        Notifications
                    </button>
                    
                    <button onClick={ () => this.switchPage("Settings") }>
                        <Gear className="BtnIcon" />
                        Settings
                    </button>
                    
                    <button onClick={ () => this.switchPage("CustomerServices") }>
                        <ChatDots className="BtnIcon" />
                        Customer Services
                    </button>
                    
                    <button onClick={ () => this.switchPage("About") }>
                        <InfoCircle className="BtnIcon" />
                        About
                    </button>
                    
                    <button onClick={ () => {
                        logout();
                        this.props.history.push("/");
                    } }>
                        <BoxArrowLeft className="BtnIcon" />
                        Log out
                    </button>
                </div>

                <div className="ContentPage" id="content_page">
                    <Default />
                </div>
            </>
        );
    }
}

export default Home;