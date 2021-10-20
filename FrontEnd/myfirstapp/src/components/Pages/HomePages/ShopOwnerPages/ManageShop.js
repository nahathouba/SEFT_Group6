import React, { useRef } from "react";
import { Search, FileRichtext } from 'react-bootstrap-icons';
import { render } from "react-dom";
import { searchShop } from "../../../../actions/bookActions";
import { GET_ERRORS } from "../../../../actions/types";

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

        const books = await searchShop(null);
        if(books.type !== GET_ERRORS)
            createBooks(books.payload);
    }

    return (
        <div>
            <h3 className="AskSearch">Search a book sale on your shop...</h3>
            <form className="SearchBar" onSubmit={searchSubmit}>
                <select className="form-select" name="sort">
                    <option selected value="BookName">Book Name</option>
                    <option value="ISBN">ISBN</option>
                    <option value="Author">Author</option>
                    <option value="Category">Category</option>
                </select>
                <button type="submit"><Search /></button>
                <input name="search" type="text" placeholder="Search for books you want..."/>
            </form>
            <div className='manage-shop-display-books' ref={body_ref} ></div>
        </div>
    )
}

export default ManageShop;