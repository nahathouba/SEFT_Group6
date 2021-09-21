import React from "react";
import { Search } from "react-bootstrap-icons";

function AdminSearchBook() {

    return (
        <>
        <form className='SearchBar AdminSearch'>
            <select className="form-select" name="sort">
                <option selected value="BookName">Book Name</option>
                <option value="ISBN">ISBN</option>
                <option value="Author">Author</option>
                <option value="Category">Category</option>
            </select>
            <button type="submit"><Search /></button>
            <input name="search" type="text" placeholder="Search for books you want..."/>
        </form>
        </>
    );
}

export default AdminSearchBook;