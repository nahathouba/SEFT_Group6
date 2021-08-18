import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { isUserLoggedIn, logout } from "../../handlers/userHandler";

class Home extends Component {

    constructor(props) {
        super(props);
        const user = isUserLoggedIn();
        if(!user)
            this.props.history.push("/");
            
        this.state = {
            user: user
        };
    }

    render() {
        return (
            <>
                <Button onClick={() => {logout(); this.props.history.push("/")} }
                        style={{ margin: "calc(20vh)" }}>logout</Button>
            </>
        );
    }
}

export default Home;