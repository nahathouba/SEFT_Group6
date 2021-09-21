import React, { useReducer } from 'react';
import './styles/default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';
import { search } from '../../../actions/functionActions';
import functionReducer from '../../../reducers/functionReducer';

function Default() {

    const [books, dispatch] = useReducer(functionReducer, {products: []})

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
        return books.products.map(v => {
            return (
                // TODO: desgin the block
                <div className='BookDIV'>
                </div>
            )
        })
    }

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
            { generateBooks() }
        </div>
        </>
    );
}

export default Default;