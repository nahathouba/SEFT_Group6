import React, { Component } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import './styles/account.css';

class Account extends Component {
    render() {
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
                <button>Edit my profile</button>
                <button className="Danger">Delete my account</button>
            </div>
            </>
        );
    }
}

export default Account;