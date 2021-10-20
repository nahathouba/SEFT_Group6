import React, { useEffect, useRef, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { render } from "react-dom";
import { search } from "../../../../actions/bookActions";
import { GET_ERRORS } from "../../../../actions/types";
import Book from "../SinglePages/Book";
import './styles/admin_manage_book.css'

function AdminManageBook(props) {

    const [book, setBook] = useState(null);
    const body_ref = useRef(null);

    async function searchBookSubmit(event) {
        event.preventDefault();

        const sort = event.target.sort.value;
        const value = event.target.search.value;

        const res = await search({
            sort: sort,
            value: value
        });

        if(res.type !== GET_ERRORS)
            setBook(res.payload);
    }

    function createBook(book) {
        render(
            <div className='display-books display-books-single-book'>
                <Book book={book} back={createBookList} />
            </div>
        , body_ref.current);
    }

    function createBookList() {
        var page = <></>;
        if(book) {
            page = (
                <div className='display-books'>
                {book.map(e=>{
                    return (
                        <span className='book-list-book' onClick={()=>createBook(e)}>
                            <span className='info'>Book Title: <span>{e.title}</span></span>
                            <span className='info'>Book ISBN: <span>{e.ISBN}</span></span>
                            <span className='info'>Book Author: <span>{e.author}</span></span>
                            <span className='info'>Book Category: <span>{e.category}</span></span>
                        </span>
                    )
                })}
                </div>
            )
        }
        render(page, body_ref.current);
    }

    useEffect(createBookList, [book]);

    useEffect(()=>{
        if(props.books)
            setBook(props.books);
    // eslint-disable-next-line
    }, []);

    return (
        <>
        <form className='SearchBar AdminSearch' onSubmit={searchBookSubmit}>
            <select className="form-select" name="sort">
                <option selected value="BookName">Book Name</option>
                <option value="ISBN">ISBN</option>
                <option value="Author">Author</option>
                <option value="Category">Category</option>
            </select>
            <button type="submit"><Search /></button>
            <input name="search" type="text" placeholder="Search for books you want..."/>
        </form>
        <div ref={body_ref}></div>
        </>
    );
}

export default AdminManageBook;