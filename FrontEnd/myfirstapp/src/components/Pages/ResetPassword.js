import { Button } from "react-bootstrap";
import React, { Component } from "react";
import { Image } from "react-bootstrap-icons";
import '../../styles/reset_password.css';

class ResetPassword extends Component {

    submitHandler = (event) => {
        event.preventDefault();

        alert(event.target.Email.value);
    }

    render() {
        return (
            <form className="ResetPasswordMain" onSubmit={this.submitHandler}>
                <Image className="Img" />
                <div className="FunctionDIV">
                    <h5 className="Intro">Forgot your password? No worries, reset your password here :)</h5>
                    <span className="AskEmail">Enter your registered email address</span>
                    <input type="text" placeholder="Email Address" name="Email" /><br/>
                    <span className="Explain">We will send an email to this address,<br/>follow steps there please!</span>
                    <br/><br/>
                    <Button type="submit">Send</Button>
                    <Button onClick={ () => this.props.history.push('/login') }>Cancel</Button>
                </div>
            </form>
        );
    }

}

export default ResetPassword;