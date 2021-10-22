import { Button } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "react-bootstrap-icons";
import Book from '../SinglePages/Book';
import { render } from "react-dom";

function EditBooks(props) {

    const display_ref = useRef(null);
    const [searched, setSearched] = useState(true);
    const [book, setBook] = useState(null);
    const [books, setBooks] = useState(props.books);

    async function submitSearch(event) {
        event.preventDefault();

        setSearched(true);
        const sort = event.target.sort.value;
        const value = event.target.search.value;

        if(value.length) {
            const sorted_books = props.books.filter(e=>e[sort] === value);
            setBooks(sorted_books);
        }
        else {
            setBooks(props.books);
            createBooksPage();
        }
    }

    function createBooksPage() {
        if(books && books.length) {
            const page = books.map(e=>{
                return (
                    <div className='display-book' onClick={()=>setBook(e)}>
                        Title: { e.title }<br/>
                        ISBN: { e.ISBN }<br/>
                        Author: { e.author }<br/>
                        Category: { e.category }<br/>
                    </div>
                )
            });
            render(page, display_ref.current);
        }
    }

    function renderPage() {
        var page = <></>;
        if(book) {
            page = <Book book={book} 
                add = {!searched} refresh={props.refresh}
                back={()=>(searched ? createBooksPage() : setBook(null))} />;
        }
        render(page, display_ref.current);
    }

    useEffect(renderPage, [book]);
    useEffect(createBooksPage, [books]);

    return (
        <div>
            <form className="SearchBar" onSubmit={submitSearch}>
                <select className="form-select" name="sort">
                    <option selected value="title">Title</option>
                    <option value="ISBN">ISBN</option>
                    <option value="author">Author</option>
                    <option value="category">Category</option>
                </select>
                <button type="submit"><Search /></button>
                <input name="search" type="text" placeholder="Search for books in your store..."/>
            </form>
            <Button className='add-book-btn' variant='dark'
                onClick={()=>{ setSearched(false); setBook({}); }} >or you can add a book here</Button>
            <div className='edit-books-display' ref={display_ref}></div>
        </div>
    )
}

export default EditBooks;