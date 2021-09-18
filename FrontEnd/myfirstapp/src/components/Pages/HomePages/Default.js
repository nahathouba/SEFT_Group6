import React, { Component } from 'react';
import './styles/default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';

class Default extends Component {

    onSubmitHandler = (event) => {
        event.preventDefault();

        alert(event.target.search.value);

    }

    render() {
        return (
            <>
            <h3 className="AskSearch">Search a book you want...</h3>
            <form className="SearchBar" onSubmit={ this.onSubmitHandler }>
                <select className="form-select" name="sort">
                    <option selected value="BookName">Book Name</option>
                    <option value="ISBN">ISBN</option>
                    <option value="Author">Author</option>
                    <option value="Category">Category</option>
                </select>
                <button type="submit"><Search /></button>
                <input name="search" type="text" placeholder="Search for books you want..."/>
            </form>
            <div className="DisplayBook">
                <div className="BookDIV"></div>
                <div className="BookDIV"></div>
                <div className="BookDIV"></div>
                <div className="BookDIV"></div>
            </div>
            </>
        );
    }
}

export default Default;