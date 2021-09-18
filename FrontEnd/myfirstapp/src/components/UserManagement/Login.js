import React, { Component } from "react";
import { Button } from "react-bootstrap";
import '../../styles/login.css';
import { Link } from "react-router-dom";
import { InfoCircle, Image, Eye, EyeSlash } from 'react-bootstrap-icons';
import { login } from "../../handlers/userHandler";
import AlertWindow from "../Plugins/AlertWindow";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = (window.location.search ? 
            {display: "block", PasswordStatus: 0} :
            {display: "none", PasswordStatus: 0}
        )
    }

    trogglePasswordBtn() {

        const trogglePassword = () => {
            var state = this.state;
            state.PasswordStatus = state.PasswordStatus === 0 ? 1 : 0;
            this.setState(state);
        }
        // eslint-disable-next-line
        return <a onClick={ trogglePassword }
                  className="TrogglePasswordBtn LoginPasswordBtn"
                  title={this.state.PasswordStatus === 0 ?
                            "Show password" : "Hide password"} >
                      {this.state.PasswordStatus === 0 ?
                       <Eye /> : <EyeSlash />}
               </a>
    }

    loginUser = (event) => {
        event.preventDefault();

        const email = event.target.Email.value;
        const password = event.target.Password.value;
        login(email, password, this.props.dispatch);
        this.props.history.push("/home");
    }

    render() {
        return (
        <>
            <AlertWindow display = { this.state.display }
                         title = "Login Failed!"
                         content="Login failed, please check your email address and password!"
                         confrim={ () => this.setState({display: "none"}) } />

            <Image className="LoginPageImg"/>
            
            <h5 className="LOGO_ad">Explore the books world with Bookeroo</h5>
            <form className="InfoDIV" onSubmit={this.loginUser}>
                <h3 className="ASK">User ID <input type="text" placeholder="Email Address" name="Email" /></h3>
                <h3 className="ASK">Password&nbsp;
                    { this.trogglePasswordBtn() }
                    <input type={ this.state.PasswordStatus === 0 ? "password" : "text" } placeholder="password" name="Password" />
                </h3>
                <Button variant="warning" type="submit">Log In</Button><br/>
                <Link className="ResetPasswordLink" to="forgot-password"><InfoCircle /> Forgot your password?</Link>
            </form>
        </>
        );
    }
}

export default Login;