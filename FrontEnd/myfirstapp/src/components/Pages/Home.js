import React, { Component } from "react";
import { PersonCircle, Cart3, Star, Bell, Gear, ChatDots, InfoCircle, BoxArrowLeft, HouseDoor, Book, Shop } from "react-bootstrap-icons";
import { getUserNotifications, logout } from "../../handlers/userHandler";
import '../../styles/home.css';
import Account from "./HomePages/Account";
import Collections from "./HomePages/Collections";
import CustomerService from "./HomePages/CustomerService";
import Default from "./HomePages/Default";
import Notifications from "./HomePages/Notifications";
import Settings from "./HomePages/Settings";
import ShoppingCart from "./HomePages/ShoppingCart";
import About from "./HomePages/About";
import AlertWindow from "../Plugins/AlertWindow";
import AdminAccount from "./HomePages/AdminPages/AdminAccount";
import AdminSearchBook from "./HomePages/AdminPages/AdminSearchBook";
import AdminManageShop from "./HomePages/AdminPages/AdminManageShop";

class Home extends Component {

    constructor(props) {
        super(props);

        if(!this.props.location.state)
            this.props.history.push("/");

        const user = this.props.location.state;
            
        this.state = {
            user: user ? user : {},
            infos: {
                unread_msg: false,
                current_page: (user.role === 'Admin' ? "ManageShop" : "Home"),
                current_btn: (user.role === 'Admin' ? "ManageShop" : "Home"),
            },
            popup: {
                display: "none",
                title: "",
                content: "",
                cancel: null, 
                confirm: null
            }
        };
    }

    loadInfos() {
        // get state and infos
        var state = this.state;
        var infos = state.infos;

        // get all infos
        // may have more infos in the future
        getUserNotifications(this.state.user.username)
        .then(res => {
            infos.unread_msg = res[1];
            
            // set state after got msg status
            state.infos = infos;
            this.setState(state);
        });

    }

    // setinterval for load infos
    componentDidMount() {
        this.loadInfos();
        this.backInterval = setInterval(()=>{
            this.loadInfos();
        }, 60000);

        this.switchButtonColor(this.state.infos.current_page);
    }

    componentWillMount() {
        clearInterval(this.backInterval);
    }

    getCurrentPage = () => {
        var page = null;
        if(this.state.user.role !== 'Admin') {
            switch(this.state.infos.current_page) {
                case "Home": page = <Default />; break;
                case "Account": page =
                    <Account user={ this.state.user }
                        history={this.props.history}
                        setUser={(user) => {this.setState({...this.state, user: user})}}
                        showAlert={(popup) => this.setState({...this.state, popup: popup})} />;
                    break;
                    
                case "ShoppingCart": page = <ShoppingCart />; break;
                case "Collections": page = <Collections />; break;
                case "Notifications": page = <Notifications />; break;
                case "Settings": page = <Settings />; break;
                case "CustomerServices": page = <CustomerService />; break;
                case "About": page = <About />; break;
                default: page = this.state.infos.current_page; break;
            }
        } else {
            switch(this.state.infos.current_page) {
                case 'ManageShop': page = <AdminManageShop
                    switchPage={ this.switchPage } />; break;

                case 'ManageAccount': page = 
                    <AdminAccount
                        history={this.props.history}
                        showAlert={(popup) => this.setState({...this.state, popup: popup})}/>;
                    break;
                case 'ManageBook': page = <AdminSearchBook />; break;
                case 'Notifications': page = <Default />; break;
                case 'Settings': page = <Default />; break;
                default: page = this.state.infos.current_page; break;
            }
        }

        return page;
    }

    switchPage = (event, special = false) => {
        if(special)
            this.setState({...this.state, infos:{...this.state.infos, current_page: event}});
        else
            this.switchButtonColor(event.target.id);
    }

    switchButtonColor = (elem) => {
        const btn = document.getElementById(elem);
        if(this.state.infos.current_page === elem) {
            if(!btn.classList.contains("SelectedButton"))
                btn.classList.add("SelectedButton");
        } else {
            document.getElementById(this.state.infos.current_btn)
                .classList.remove("SelectedButton");
            
            btn.classList.add("SelectedButton");

            var tmp_state = this.state;
            tmp_state.infos.current_page = elem;
            tmp_state.infos.current_btn = elem;
            this.setState(tmp_state);
        }
    }

    render() {
        return (
            <>
                <AlertWindow {... this.state.popup } />
                <h5 className="LOGO_ad">Hello, { (this.state.user.role === 'Admin' ? "Admin " : "Mr.") }{ this.state.user.full_name }</h5>
                { (this.state.user.role !== 'Admin' ?
                    <div className="MenuPage">
                        <button onClick={ this.switchPage } id='Home'>
                            <HouseDoor className="BtnIcon" />
                            Home
                        </button>

                        <button onClick={ this.switchPage } id='Account'>
                            <PersonCircle className="BtnIcon" />
                            Account
                        </button>

                        <button onClick={ this.switchPage } id='ShoppingCart'>
                            <Cart3 className="BtnIcon" />
                            Shopping Cart
                        </button>
                        
                        <button onClick={ this.switchPage } id='Collections'>
                            <Star className="BtnIcon" />
                            Collections
                        </button>
                        
                        <div className={ this.state.infos.unread_msg ? "UnreadMsg" : null}></div>
                        <button onClick={ this.switchPage } id='Notifications'>
                            <Bell className="BtnIcon" />
                            Notifications
                        </button>
                        
                        <button onClick={ this.switchPage } id='Settings'>
                            <Gear className="BtnIcon" />
                            Settings
                        </button>
                        
                        <button onClick={ this.switchPage } id='CustomerServices'>
                            <ChatDots className="BtnIcon" />
                            Customer Services
                        </button>
                        
                        <button onClick={ this.switchPage } id='About'>
                            <InfoCircle className="BtnIcon" />
                            About
                        </button>
                        
                        <button onClick={ () => {
                            logout(this.props.history);
                        } }>
                            <BoxArrowLeft className="BtnIcon" />
                            Log out
                        </button>
                    </div> :

                    <div className="MenuPage">
                        <button onClick={ this.switchPage } id='ManageShop'>
                            <Shop className="BtnIcon" />
                            Manage Shop
                        </button>
                        
                        <button onClick={ this.switchPage } id='ManageAccount'>
                            <PersonCircle className="BtnIcon" />
                            Manage Account
                        </button>
                        <button onClick={ this.switchPage } id='ManageBook'>
                            <Book className="BtnIcon" />
                            Manage Book
                        </button>
                        
                        <div className={ this.state.infos.unread_msg ? "UnreadMsg" : null}></div>
                        <button onClick={ this.switchPage } id='Notifications'>
                            <Bell className="BtnIcon" />
                            Notifications
                        </button>
                        
                        <button onClick={ this.switchPage } id='Settings'>
                            <Gear className="BtnIcon" />
                            Settings
                        </button>

                        <button onClick={ () => {
                            logout(this.props.history);
                        } }>
                            <BoxArrowLeft className="BtnIcon" />
                            Log out
                        </button>
                    </div> ) }

                <div className="ContentPage" id="content_page">
                    { this.getCurrentPage() }
                </div>
            </>
        );
    }
}

export default Home;