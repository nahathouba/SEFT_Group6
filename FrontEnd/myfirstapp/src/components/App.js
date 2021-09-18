import React, { useReducer } from "react";
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import Help from "./Pages/Help";
import Landing from "./Pages/Landing";
import Login from "./UserManagement/Login";
import Register from "./UserManagement/Register";
import Home from "./Pages/Home";
import '../styles/app.css';
import ResetPassword from "./Pages/ResetPassword";
import securityReducer from "../reducers/securityReducer";

function App() {

    const[security, dispatch] = useReducer(securityReducer, {validToken: false,user: {}});

    return (
        <Router>
            <Link className="LOGO" to="/">Bookeroo</Link>
            <Switch>
                <Route path="/help"><Help /></Route>
                <Route path="/login" render={ props => (<Login {...props} dispatch={dispatch} />)} />
                <Route path="/register" render={ props => (<Register {...props} />)} />
                <Route path="/forgot-password" render={ props => (<ResetPassword {...props} />)} />

                {/* <Route path="/home" render={ props => (<Home {...props} />)} /> */}
                <Route path="/home" render={ props => (
                    security.validToken ? 
                        <Home {...props} /> :
                        <Redirect to='/login' />)} />

                <Route path="/" render={ props => (<Landing {...props} />)} />
            </Switch>
            <span className="Copyright">Bookeroo &copy; 2021</span>
        </Router>
    );
}

export default App;