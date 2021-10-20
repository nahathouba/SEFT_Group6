import React, { useEffect, useState } from 'react';
import './styles/default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';
import { search } from '../../../actions/bookActions';
import { GET_ERRORS } from '../../../actions/types';

function Default() {

    const [books, setBooks] = useState([]);
    const [display_books, setBooksPage] = useState(<></>);

    async function onSubmitHandler(event) {
        event.preventDefault();

        const sort = event.target.sort.value;
        const value = event.target.search.value;

        const books = await search({
            sort: sort,
            value: value
        });

        if(books.type !== GET_ERRORS)
            setBooks(books.payload);
    }

    const generateBooks = () => {
        const page = books.map(e => {
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