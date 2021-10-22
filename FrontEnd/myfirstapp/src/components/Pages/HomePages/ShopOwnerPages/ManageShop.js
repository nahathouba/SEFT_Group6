import React, { useEffect, useRef } from "react";
import { Search, FileRichtext } from 'react-bootstrap-icons';
import { render } from "react-dom";

function ManageShop(props) {

    const body_ref = useRef(null);

    function createBooks(books) {
        if(books && books.length) {
            const page = books.map(e=>{
                return (
                <div className='single-book'>
                    <FileRichtext className='image' />
                    <div className='details'>
                        Title: {e.title}<br/>
                        Author: {e.author}<br/>
                        ISBN: {e.ISBN}<br/>
                        Category: {e.category}<br/>
                        Description: {e.description}<br/>
                    </div>
                </div>
                )
            })

            render(page, body_ref.current);
        }
    }

    async function searchSubmit(event) {
        event.preventDefault();

        const sort = event.target.sort.value;
        const value = event.target.search.value;

        const searched_books = props.books.filter(e=>e[sort] === value);
        createBooks(searched_books)
    }

    useEffect(()=>createBooks(props.books), [props.books]);

    return (
        <div>
            <h3 className="AskSearch">Search a book sale on your shop...</h3>
            <form className="SearchBar" onSubmit={searchSubmit}>
                <select className="form-select" name="sort">
                    <option selected value="title">Title</option>
                    <option value="ISBN">ISBN</option>
                    <option value="author">Author</option>
                    <option value="category">Category</option>
                </select>
                <button type="submit"><Search /></button>
                <input name="search" type="text" placeholder="Search for books you want..."/>
            </form>
            <div className='manage-shop-display-books' ref={body_ref} ></div>
        </div>
    )
}

export default ManageShop;