import React, { Component } from "react";
import { CheckCircle, Pencil, Eye, EyeSlash } from "react-bootstrap-icons";
import { validation } from "../../handlers/validateInput";
import '../../styles/register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import AlertWindow from "../Plugins/AlertWindow";
import { register } from "../../handlers/userHandler";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "FirstName": 0,
            "LastName": 0,
            "Password": 0,
            "RePassword": 0,
            "Email": 0,
            "FirstNameMsg": "",
            "LastNameMsg": "",
            "PasswordMsg": "",
            "RePasswordMsg": "",
            "EmailMsg": "",
            display: "none",
            display_password: {
                password: false,
                re_password: false
            }
        }
    }

    getStyleStatus(style) {
        var status = "";
        switch(this.state[style]) {
            case 1: status = "ErrorSet"; break;
            case 2: status = "PassSet"; break;
            default: status = "Set";
        }
        return status;
    }

    passwordStatus = (password_type) => {
        const setStatus = () => {
            const tmp_state = this.state;
            tmp_state.display_password[password_type]
                = (tmp_state.display_password[password_type]
                    ? false : true);
            this.setState(tmp_state);
        }

        return (
            // eslint-disable-next-line
            <a onClick={ setStatus }
               className='TrogglePasswordBtn'
               title= { this.state.display_password[password_type]
                        ? "Hide password" : "Show password"} >
                { this.state.display_password[password_type] ? <EyeSlash /> : <Eye /> }
            </a>
        )
        
    }

    getMsg(type) {
        switch(this.state[type]) {
            case 1: return <span>{this.state[type+"Msg"]}</span>;
            case 2: return <span><CheckCircle />Passed</span>;
            default: return;
        }
    }

    onChangeHandler = (event) => {
        var state = this.state;
        const validate_result = validation(event.target.name, event.target.value);
        state[event.target.name] = validate_result[0];
        state[event.target.name+"Msg"] = validate_result[1] ? validate_result[1] : "";

        if(event.target.name === 'RePassword' && state["RePasswordMsg"] === "") {
            if(document.getElementById('Password').value !== event.target.value) {
                state["RePassword"] = 1;
                state["RePasswordMsg"] = 'Two-time password not match!';
            }
        }
                
        this.setState(state);
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        var state = this.state;

        if(event.target.FirstName.value === "") {
            state["FirstName"] = 1;
            state["FirstNameMsg"] = "First name is required";
        }
        if(event.target.LastName.value === "") {
            state["LastName"] = 1;
            state["LastNameMsg"] = "Last name is required";
        }
        if(event.target.Password.value === "") {
            state["Password"] = 1;
            state["PasswordMsg"] = "Password is required";
        }
        if(event.target.RePassword.value === "") {
            state["RePassword"] = 1;
            state["RePasswordMsg"] = "Re-input Password is required";
        }
        if(event.target.Email.value === "") {
            state["Email"] = 1;
            state["EmailMsg"] = "Email address is required";
        }

        if(state.FirstName === 2 &&
           state.LastName === 2 &&
           state.Password === 2 &&
           state.RePassword === 2 &&
           state.Email === 2) {
                register(event.target.FirstName.value,
                         event.target.LastName.value,
                         event.target.Email.value,
                         event.target.Password.value,
                         event.target.RePassword.value,
                         event.target.Gender.value)
                state.display = "block";
        }

        this.setState(state);
    }

    render() {
        return (
            <>
            <AlertWindow display = { this.state.display }
                         title = "Sign up successfully!"
                         content={"Welcome to the family of Bookeroo! "+
                         " Your account has been created successfully! "+
                         "Click the button below then we will redirect you to the login page of Bookeroo."}
                         confirm={ () => this.props.history.push("/login") }
                         color="skyblue" />

            <h5 className="LOGO_ad">Meet with your favourite books on Bookeroo</h5>
            <Pencil className="IntroSign" />
            <span className="SignUpIntro">Sign up here, please fill your information, we will create<br/>an account for you, quick and easy :)</span>
            <form className="RegisterMainForm" onSubmit={ this.onSubmitHandler }>
                <div className="SameLine">
                    <div className={this.getStyleStatus("FirstName")}>
                        <span>* First Name</span><br/>
                        <input type="text" placeholder="First Name" name="FirstName" onChange={this.onChangeHandler} /><br/>
                        { this.getMsg("FirstName") }
                    </div>
                    <div className={this.getStyleStatus("LastName")}>
                        <span>* Last Name</span><br/>
                        <input type="text" placeholder="Last Name" name="LastName" onChange={this.onChangeHandler} /><br/>
                        { this.getMsg("LastName") }
                    </div>
                </div>
                <div className="SameLine">
                    <div className={this.getStyleStatus("Password")}>
                        <span>* Password</span><br/>
                        { this.passwordStatus('password') }
                        <input type = { this.state.display_password.password ? "input" : "password" }
                               placeholder="Password" name="Password" id='Password' onChange={this.onChangeHandler} /><br/>
                        { this.getMsg("Password") }
                    </div>
                    <div className={this.getStyleStatus("RePassword")}>
                        <span>* Re-input Password</span><br/>
                        { this.passwordStatus('re_password') }
                        <input type = { this.state.display_password.re_password ? "input" : "password" }
                               placeholder="Re-input Password" name="RePassword" onChange={this.onChangeHandler} /><br/>
                        { this.getMsg("RePassword") }
                    </div>
                </div>
                <div className={this.getStyleStatus("Email")}>
                    <span>* Email Address</span><br/>
                    <input type="text" placeholder="Email Address" name="Email" onChange={this.onChangeHandler} /><br/>
                    { this.getMsg("Email") }
                </div>
                <div className="Set">
                    <span>Gender</span><br/>
                    <select className="form-select"
                            style={{
                                width: "calc(15vw)",
                                border: "1px solid gray"}}
                            name="Gender">
                        <option selected value="Secret"></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Secret">Secret</option>
                    </select>
                </div>
                <Button type="submit">Sign up now</Button>
            </form>
            </>
        );
    }
}

export default Register;