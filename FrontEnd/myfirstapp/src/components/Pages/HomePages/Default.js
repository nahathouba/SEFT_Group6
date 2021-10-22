import React, { useEffect, useState } from 'react';
import './styles/default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, Image } from 'react-bootstrap-icons';
import { search } from '../../../actions/bookActions';
import { GET_ERRORS } from '../../../actions/types';
import { Button } from 'react-bootstrap';

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
                <div className='BookDIV'>
                    <Image className='book-img' />
                    <div className='book-details'>
                        <span>Title: { e.title }</span>
                        <span>Author: { e.author }</span>
                        <span>ISBN: { e.ISBN }</span>
                        <span>Price: $ { e.price }</span>
                        <span>Description: { e.description }</span>
                        <Button className='btn'>Add to cart</Button>
                        <Button className='btn'>Add to collection</Button>
                        <Button className='btn'>View details</Button>
                    </div>
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
                <option selected value="title">Title</option>
                <option value="ISBN">ISBN</option>
                <option value="author">Author</option>
                <option value="category">Category</option>
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