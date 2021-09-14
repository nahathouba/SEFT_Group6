import { Button } from 'react-bootstrap';
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
        switch(this.state.page) {

            case "Edit":
                return (
                    <>
                    <div className='SwitchEdit'>
                        <button className="Selected">Editing Profile</button>
                        <button onClick={ () => { this.setState({page: "Password"}) } }>Reset Password</button>
                        <button onClick={ () => { this.setState({page: "Landing"}) } }>Go Back</button>
                    </div>
                    <form className="EditProfile">
                        <h1 className="AccountPageWelcome">Editing Profile</h1>
                        <label to="Name" >Name</label>
                        <input type="text" className="InfoInput"
                            name="Name" placeholder="Please input your name here"
                            value={ this.props.user.username } />
                        <label to="Email" >Email<span className='Annotation'>* Cannot change</span></label>
                        <input type="text" className="InfoInput"
                            name="Email" disabled placeholder="Please input your email here"
                            value={ this.props.user.email } />
                        <label to="Description" >About Me</label>
                        <input type="text" className="InfoInput"
                            name="Description" placeholder="Nothing here"
                            value={ this.props.user.about } />
                        <label to="Gender" >Gender</label>
                        <select className="InfoInput" name="Gender">
                            <option value="Secret">Select Your Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Secret">Secret</option>
                        </select>
                        <label to="Address" >Address</label>
                        <input type="text" className="InfoInput" name="Address" placeholder="Please input your address here" />
                        <br/><Button type='submit'>Submit</Button>
                    </form>
                    </>
                );
            
            case "Password":
                return (
                    <>
                    <div className='SwitchEdit'>
                        <button onClick={ () => { this.setState({page: "Edit"}) } }>Editing Profile</button>
                        <button className="Selected">Reset Password</button>
                        <button onClick={ () => { this.setState({page: "Landing"}) } }>Go Back</button>
                    </div>
                    </>
                );

            default:
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
        }
    }

    render() {
        return this.loadPage();
    }
}

export default Account;