import { Component } from "react";
import { Navbar, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/header.css';

class Header extends Component {

    submitHandler = () => {
        alert(document.getElementById("search").value);
    }

    render() {
        return (
        <>
            <Navbar className="navbar-dark bg-primary Header">
                <Link to="/" className="Title">Home</Link>
                <InputGroup className="SearchBar">
                    <FormControl id="search" placeholder="Search for something"/><Button variant="secondary" onClick={ this.submitHandler }><Search /></Button>
                </InputGroup>
            </Navbar>
        </>
        );
    }
}

export default Header;