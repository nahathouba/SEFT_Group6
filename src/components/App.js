import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";

class App extends Component {

    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;