import React, { useEffect, useReducer, useState } from 'react';
import './styles/default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';
import { search } from '../../../actions/bookActions';
import bookReducer from '../../../reducers/bookReducer';

function Default() {

    const [books, dispatch] = useReducer(bookReducer, {products: []})
    const [display_books, setBooksPage] = useState(<></>);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const sort = event.target.sort.value;
        const value = event.target.search.value;

        search({
            sort: sort,
            value: value
        })(dispatch);
    }

    const generateBooks = () => {
        const page = books.products.map(e => {
            return (
                // TODO: desgin the block
                <div className='BookDIV'>
                    { e.name }
                </div>
            )
        })
        setBooksPage(page);
    }

    useEffect(generateBooks, [books]);

    return (
        <>
        <h3 className="AskSearch">Search a book you want...</h3>
        <form className="SearchBar" onSubmit={ onSubmitHandler }>
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
            { display_books }
        </div>
        </>
    );
}

export default Default;