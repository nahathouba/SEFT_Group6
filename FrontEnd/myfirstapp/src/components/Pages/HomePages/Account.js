import React, { Component } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import './styles/account.css';

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: "Landing"
        }
    }

    loadPage() {
        if(this.state.page === 'Landing')
            return (
                <>
                <h1 className="AccountPageWelcome">Welcome, { this.props.user.username }</h1>
                <div className="AccountDetails">
                    <PersonCircle className="Avatar" />
                    <h3>My Details</h3>
                    My ID: { this.props.user.id }<br/>
                    My Name: { this.props.user.username }<br/>
                    My Email: { this.props.user.email }<br/>
                    <hr/>
                    <button onClick={ () => {this.setState({page: 'Edit'})} }>Edit my profile</button>
                    <button className="Danger">Delete my account</button>
                </div>
                </>
            );


        else if(this.state.page === 'Edit') 
            return (
                <>
                <h1 className="AccountPageWelcome">Editing Profile</h1>
                </>
            );
    }

    render() {
        return this.loadPage();
    }
}

export default Account;