import { Button } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InfoCircle, Image } from 'react-bootstrap-icons';
import { isUserLoggedIn } from "../../handlers/userHandler";
import '../../styles/landing.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Landing extends Component {

    constructor(props) {
        super(props);
        if(isUserLoggedIn())
            this.props.history.push("/home");
    }

    render() {
        return (
            <>
                <div className="Welcome">
                    Welcome to Bookeroo
                </div>
                <div className="ButtonDIV">
                    <Button variant="primary"
                        className="LoginBtn"
                        style={{width: "calc(10vw)"}}
                        onClick={() => {this.props.history.push('/login')}}>Login</Button><br/>

                    <Button variant="primary"
                        className="LoginBtn"
                        onClick={() => {this.props.history.push('/register')}}>Create new account</Button>
                    <Link className="HelpLink" to="/help"><InfoCircle /> Needs help?</Link>
                </div>
                <Image className="LandingPageImg" />
            </>
        );
    }

}

export default Landing;